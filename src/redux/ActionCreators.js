import * as ActionTypes from './ActionTypes';

// function creates an action object
export const addComment = (dishId, rating, author, comment) => ({
        type: ActionTypes.ADD_COMMENT,
        payload: {
            dishId: dishId,
            rating: rating,
            author: author,
            comment: comment
        }
    
});