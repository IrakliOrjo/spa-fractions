import { useSelector, useDispatch } from "react-redux"
import { selectAllPosts, getPostsStatus, getPostsError, fetchPosts } from './postsSlice'
import { useEffect } from "react"



const PostsList = () => {
    const dispatch = useDispatch()

    const posts = useSelector(selectAllPosts)
    const postsStatus = useSelector(getPostsStatus)
    const error = useSelector(getPostsError)

    useEffect(() => {
        if(postsStatus === 'idle'){
            dispatch(fetchPosts())
        }
    }, [postsStatus, dispatch])

    let content;
    if(postsStatus === 'loading'){
        content = <p>Loading...</p>
    } else if(postsStatus === 'failed') {
        content = <p>{error}</p>
    } else if(postsStatus === 'success'){
        const orderedPosts = posts
        content= orderedPosts
    }
    console.log('pooost', posts)
  return (
    <section>
        <h2>posts</h2>
        
    </section>
  )
}

export default PostsList