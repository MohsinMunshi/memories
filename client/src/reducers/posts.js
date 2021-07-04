export default (state = {isLoading:true, posts:[]}, action) => {
    switch (action.type) {
        case 'FETCH_ALL':

            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPage: action.payload.numberOfPage 
            }

        case 'CREATE':

            return {...state,posts:[...state, action.payload]} 

        case 'UPDATE':

            return {...state,posts:state.posts.map((post)=>{
                if(post._id === action.payload._id){
                    return action.payload
                }
                else{
                    return post
                }
            })}

        case 'DELETE':

            return {...state,posts:state.posts.filter((post)=>post.id !== action.payload)}   

        case 'LIKEPOST':
            
            return {...state,posts:state.posts.map((post)=>{
                if(post._id === action.payload._id){
                    return action.payload
                }
                else{
                    return post
                }
            })}

        case 'FETCH_BY_SEARCH':
        
            return {...state, posts: action.payload}    
        
        case 'START_LOADING':

            return {...state, isLoading: true }

        case 'END_LOADING':

            return {...state, isLoading: false }

        case 'FETCH_POST':

            return  {...state, post: action.payload}    

        default:

            return state;
    }
}