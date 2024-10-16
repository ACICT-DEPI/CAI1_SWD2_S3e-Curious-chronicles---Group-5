import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs, limit, query, serverTimestamp, Timestamp, updateDoc, orderBy, where } from "firebase/firestore";
import { isEmpty } from "lodash";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CommentBox from "../components/CommentBox";
import Like from "../components/Like";
import FeatureBlogs from "../components/FeatureBlogs";
import RelatedBlog from "../components/RelatedBlog";
import Tags from "../components/Tags";
import UserComments from "../components/UserComments";
import { db } from "../firebase";
import Spinner from "../components/Spinner";

const Detail = ({ setActive, user }) => {
  const userId = user?.uid;
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [comments, setComments] = useState([]);
  let [likes, setLikes] = useState([]);
  const [userComment, setUserComment] = useState("");
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const getRecentBlogs = async () => {
      const blogRef = collection(db, "blogs");
      const recentBlogs = query(
        blogRef,
        orderBy("timestamp", "desc"),
        limit(5)
      );
      const docSnapshot = await getDocs(recentBlogs);
      setBlogs(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    getRecentBlogs();
  }, []);

  useEffect(() => {
    if (id) getBlogDetail();
  }, [id]);

  const getBlogDetail = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");
    const docRef = doc(db, "blogs", id);
    const blogDetail = await getDoc(docRef);

    if (blogDetail.exists()) {
      const data = blogDetail.data();
      setBlog(data);
      setComments(data.comments || []);
      setLikes(data.likes || []);
      
      const allBlogsSnapshot = await getDocs(blogRef);
      const allTags = allBlogsSnapshot.docs.flatMap(doc => doc.get("tags") || []);
      setTags([...new Set(allTags)]);

      const relatedBlogsQuery = query(
        blogRef,
        where("tags", "array-contains-any", data.tags),
        limit(3)
      );

      const relatedBlogSnapshot = await getDocs(relatedBlogsQuery);
      const relatedBlogs = relatedBlogSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRelatedBlogs(relatedBlogs);
    } else {
      toast.error("Blog not found");
    }

    setLoading(false);
    setActive(null);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const newComment = {
      createdAt: Timestamp.fromDate(new Date()),
      userId,
      name: user?.displayName,
      body: userComment,
    };

    const updatedComments = [...comments, newComment];
    toast.success("Comment posted successfully");
    await updateDoc(doc(db, "blogs", id), {
      comments: updatedComments,
      timestamp: serverTimestamp(),
    });

    setComments(updatedComments);
    setUserComment("");
  };

  const handleLike = async () => {
    if (userId) {
      const index = likes.findIndex((like) => like === userId);
      if (index === -1) {
        likes.push(userId);
      } else {
        likes.splice(index, 1);
      }
      setLikes([...new Set(likes)]);

      await updateDoc(doc(db, "blogs", id), {
        likes,
        timestamp: serverTimestamp(),
      });
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="single">
      <div
        className="blog-title-box"
        style={{ backgroundImage: `url('${blog?.imgUrl}')` }}
      >
        <div className="overlay"></div>
        <div className="blog-title">
          <span>{blog?.timestamp.toDate().toDateString()}</span>
          <h2>{blog?.title}</h2>
        </div>
      </div>
      <div className="container-fluid pb-4 pt-4 padding blog-single-content">
        <div className="container padding">
          <div className="row mx-0">
            <div className="col-md-8">
              <span className="meta-info text-start">
                By <p className="author">{blog?.author}</p> -&nbsp;
                {blog?.timestamp.toDate().toDateString()}
                <Like handleLike={handleLike} likes={likes} userId={userId} />
              </span>
              <div className="text-start" dangerouslySetInnerHTML={{ __html: blog?.description }} />
              <div className="text-start">
                <Tags tags={blog?.tags} />
              </div>
              <br />
              <div className="custombox">
                <div className="scroll">
                  <h4 className="small-title">{comments?.length} Comment</h4>
                  {isEmpty(comments) ? (
                    <UserComments msg="No Comment yet posted on this blog. Be the first to comment" />
                  ) : (
                    comments.map((comment, index) => (
                      <UserComments key={index} {...comment} />
                    ))
                  )}
                </div>
              </div>
              <CommentBox
                userId={userId}
                userComment={userComment}
                setUserComment={setUserComment}
                handleComment={handleComment}
              />
            </div>
            <div className="col-md-3">
              <div className="blog-heading text-start py-2 mb-4">Tags</div>
              <Tags tags={tags} />
              <FeatureBlogs title="Recent Blogs" blogs={blogs} />
            </div>
          </div>
          <RelatedBlog id={id} blogs={relatedBlogs} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
