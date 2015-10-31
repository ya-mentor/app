

/**
* @api {post} /learners /learners {post}
*
* @apiDescription Create a new learner in the db
*
* @apiName createlearner
* @apiGroup LearnersAPI
*
* @apiParam {Object} Request parameters
* This method expects a subset of model properties as request parameters.
*
* The object contains the properties below
* @apiParam {String} firstname  [Required] Firstname of the User with default value null
* @apiParam {String} lastname     [Required] Lastname of the User with default value null
* @apiParam {String} email [Required] Email of the User with default value null
* @apiParam {String} username  [Required] Username of the User with default value null
* @apiParam {String} password     [Requestuired] password of the User with default value null
* @apiParam {String} [address] Optional [default value: null]
* @apiParam {String} [bio]   Optional [default null.]
* @apiParam {String} [photo]  Optional picture of the User.
* @apiParam {String} [linkedIn]     LinkedIn url, optional [default value: null]
* @apiParam {String} [skills] optional [default value: null]
* @apiParam {String} role [Required] [default value null.]
*
*
* @apiSuccess {Object} Object mentor object containing the newly created mentor's details
* @apiError {400} Bad request / Validation errors
**/


/**
* @api {get} /learners /learners {get}
* @apiName getLearners
* @apiGroup LearnersAPI
* @apiDescription Retrieves all learners
*
* @apiSuccess {array} Array An array of objects containing learners
* @apiError {403} Unathorized Invalid auth
**/


/**
* @api {get} /learners/:learnerId /learners/:learnerId {get}
* @apiGroup LearnersAPI
* @apiDescription Retrieves a particular learner details
*
* @apiParam {String} learnerId Learner's unique id.
*
* @apiSuccess {Object} Object learner object containing a single learner's details
* @apiError {404} learnerNotFound The <code>id</code> supplied doesn't match any learner
* @apiError {403} Unathorized Invalid auth
**/



/**
* @api {put} /learners/:learnerId /learners/:learnerId {put}
*
* @apiGroup LearnersAPI
** @apiDescription Updates a learner details.

* @apiParam {String} id learner's unique id.
* @apiSuccess {Object} Object learner object containing updated details
* @apiError {404} learnerNotFound The <code>id</code> supplied doesn't match any learner
* @apiError {403} Unathorized Invalid auth
**/


/**
* @api {delete} /learners/:learnerId /learners/:learnerId {delete}
*
* @apiGroup LearnersAPI
*
* @apiParam {String} learnerId learner's unique id.
* @apiSuccess {object} Object empty returns empty object
* @apiError {403} Unathorized Invalid auth
* @apiError {404} learnerNotFound The <code>id</code> supplied doesn't match any learner
**/
