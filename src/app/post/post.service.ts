import {Injectable} from "@angular/core";
import {PostModel} from "./post.model";
import {Subject, Observable, BehaviorSubject, combineLatest, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {switchMap, map} from "rxjs/operators"
import {Router} from "@angular/router"

export interface Post {
   name: string;
   price: number;
   priceDuration: string;
   description: string;
   imagePath: string;
   userID: string;
   date: Date;
   tags: string[];
   categories: string[];
   location: {};
}

@Injectable()
export class PostService {
  //collection
  private postCollection: AngularFirestoreCollection<Post>;
  postList: Observable<PostModel[]>;
  queriedPostList$: Observable<{}[]>;
  queriedPostRef$: Observable<any> //this will contain queried post ref

  //document
  private postDoc: AngularFirestoreDocument<Post>;
  specificPost: Observable<PostModel>

  //local storage
  private posts: PostModel[] = [];
  postToEdit: PostModel; //this is the specific post to Edit

  //filters for querying
  nameFilter$:  BehaviorSubject<string|null>;
  idFilter$: BehaviorSubject<string|null>;
  category$ = new Subject<string>();




  constructor(private http: HttpClient, private authService: AuthService, private afs: AngularFirestore, private router: Router) {
    this.nameFilter$ = new BehaviorSubject(null);
    this.idFilter$ = new BehaviorSubject(null);

         //Below is for querying posts based on clicked category
        this.queriedPostList$ = this.category$.pipe(
           switchMap(category =>
             this.afs.collection('postList', ref => ref.where('categories', 'array-contains', category))
             .snapshotChanges().pipe(
             map(actions => {
             return actions.map(a => {
               const data = a.payload.doc.data() as Post;
               const id = a.payload.doc.id;
               return { id, ...data };
             })
             })
             )
           )
         );

            //below is a querying process used to find a specific post for updating based on 2 parameter name and UserID
            this.queriedPostRef$ = combineLatest(
            this.nameFilter$,
            this.idFilter$
          ).pipe(
            switchMap(([name, userID]) =>
              this.afs.collection('postList', (ref) => {
                let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
                if (name) { query = query.where('name', '==', name) };
                if (userID) { query = query.where('userID', '==', userID) };
                return query;
              }).snapshotChanges()
            )
          );

    }


//general post retrieval ============>


    getPosts() {
      this.postCollection = this.afs.collection<PostModel>('postList');
      this.postList = this.postCollection.snapshotChanges().pipe(
    map(actions => {
    return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
      })
      );
      return this.postList;
    }

    getPost(id: number) {
      return this.posts.slice()[id];
    }

    getPostByID(id) {
      this.postDoc = this.afs.doc<Post>('postList/' + id);
       this.specificPost = this.postDoc.valueChanges();
       return this.specificPost;
    }

     applyCategoryFilter(category) {
       this.category$.next(category)
    }

    getQueriedList() {
       return this.queriedPostList$
    }




//Updating a post process below=========>
    storePostToEdit(post: PostModel) {
      this.postToEdit = post;
    }

    getPostToEdit() {
      return this.postToEdit;
    }


    getPostRef(name, userID) {
      this.applyFilter(name, userID)
      return this.queriedPostRef$
    }

   applyFilter(name, userID) {
     this.nameFilter$.next(name);
     this.idFilter$.next(userID);
   }

     updatePost(ref: string) {
       this.postDoc = this.afs.doc<Post>('postList/' + ref);
        this.specificPost = this.postDoc.valueChanges();
        this.postDoc.update(this.postToEdit).then(result => {
          console.log("Post Updated")
          this.router.navigate(["/profile"])
        })

     }

 //Adding a post below =================>

 addPost(post: PostModel) {
   if(post.userID) {
     this.postCollection.add(post)
     .then(result => {
       console.log("success")
     })
     .catch(err => {
       console.log(err)
     })
   } else {
     console.log("You are not logged in to Post");
     return;
   }
 }

//========================================>

deletePost(ref) {
    this.postDoc = this.afs.doc<Post>('postList/' + ref);
    this.specificPost = this.postDoc.valueChanges();
    this.postDoc.delete().then(res => {
      this.postList = this.postCollection.valueChanges();
      console.log("Message Deleted Successfully")
      return "Delete Success"
    })
  }


//Method reserved for post displayed in profile page ============>
 getUserPost(id: string) {
   return this.afs.collection('postList', ref => ref.where('userID', '==', id))
 }



}
