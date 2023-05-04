import {
  FETCH_ALL,
  FETCH_BY_SEARCH,
  FETCH_POST,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  COMMENT,
  FETCH_MY_POSTS,
} from '../constants/actionTypes'

const posts = (state = { isLoading: true, posts: [], myPosts: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true }
    case 'END_LOADING':
      return { ...state, isLoading: false }
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      }
    case FETCH_MY_POSTS:
      return {
        ...state,
        myPosts: action.payload,
      }
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload.data }
    case FETCH_POST:
      return { ...state, post: action.payload.post }
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        myPosts: state.myPosts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      }
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload
          }
          return post
        }),
        myPosts: state.myPosts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload
          }
          return post
        }),
      }
    case CREATE:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        myPosts: [...state.myPosts, action.payload],
      }
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        myPosts: state.myPosts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      }
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        myPosts: state.myPosts.filter((post) => post._id !== action.payload),
      }
    default:
      return state
  }
}
export default posts
