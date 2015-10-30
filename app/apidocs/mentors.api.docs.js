/**
* @api {post} /mentors
*
* @apiDescription
* Create a new instance of a mentor and persist it into database
*
* @apiName createMentor
* @apiGroup MentorsAPI
*
* @apiParam {Object}  Request parameters
* This method expects a subset of model properties as request parameters.
*
* The object contains the properties below
* @apiParam {String} firstname  Mandatory Firstname of the User with default value null
* @apiParam {String} lastname     Mandatory Lastname of the User with default value null
* @apiParam {String} email Mandatory Email of the User with default value null
* @apiParam {String} username  Mandatory Username of the User with default value null
* @apiParam {String} password     Mandatory password of the User with default value null
* @apiParam {String} [address] Optional with default value null
* @apiParam {String} [bio]   Optional with default null.
* @apiParam {String} [photo]  Optional picture of the User.
* @apiParam {String} [linkedIn]     optional with default value null
* @apiParam {String} [skills] optional with default value null
* @apiParam {String} role Mandatory with default value null.
*
*
* @apiSuccess {Object} mentor object containing the newly created mentor's details
* @apiError {400} Error 400 with the error response.
*/


/**
* @api {get} /mentors Get a list of all mentors
* @apiName getMentors
* @apiGroup MentorsAPI
*
* @apiParam {null} This method does not accept any parameters.
*
*
* @apiSuccess {Object} An array of objects containing each mentor's details
* @apiError {400} Error 400 with the error response.
*/


/**
* @api {get} /mentors/:mentorId Find a mentor instance by id
* @apiName readMentor
* @apiGroup MentorsAPI
*
* @apiParam {String} mentorId. mentor's unique id.
*
* @apiSuccess {Object} mentor object containing a single mentor's details
* @apiError {400} MentorNotFound The <code>id</code> supplied doesn't match any mentor
*/



/**
* @api {put} /mentors/:mentorId
*
* @apiDescription
* Update an existing mentor instance by id
*
* @apiName updateMentor
* @apiGroup MentorsAPI
*
* @apiParam {String} mentor's unique id.

* @apiSuccess {Object} mentor object containing updated mentor's details
* @apiError {400} MentorNotFound The <code>id</code> supplied doesn't match any mentor
*/


/**
* @api {delete} /mentors/:mentorId
*
* @apiDescription
* Delete a mentor instance by id
*
* @apiName deleteMentor
* @apiGroup MentorsAPI
*
* @apiParam {String} mentor's unique id.

* @apiSuccess {null} returns empty object
* @apiError {400} MentorNotFound The <code>id</code> supplied doesn't match any mentor
*/

/**
* @api {get} /mentors/:mentorId/requests
*
* @apiDescription
* Get a list of requests belonging to a mentor by id
*
* @apiName getMentorRequest
* @apiGroup MentorsAPI
*
* @apiParam {String} mentor's unique id.

* @apiSuccess {Object} Objects containing request details
* @apiError {400} MentorNotFound The <code>id</code> supplied doesn't match any mentor
*/

/**
* @api {post} /mentors/:mentorId/requests
*
* @apiDescription
* Post a request for a mentor by id
*
* @apiName postMentorRequest
* @apiGroup MentorsAPI
*
* @apiParam {Object} Containing mentor's unique id and user's unique id.

* @apiSuccess {200} Request succesfully sent
* @apiError {400} Error status with error message.
*/


/**
* @api {post} /mentors/:mentorId/upvote
*
* @apiDescription
* Vote for a mentor by id
*
* @apiName upvoteMentor
* @apiGroup MentorsAPI
*
* @apiParam {Object} Containing mentor's unique id and user's unique id.

* @apiSuccess {200} You have upvoted this mentor
* @apiError {400} Error status with error message.
*/

/**
* @api {get} /mentors/:mentorId/learners
*
* @apiDescription
* Get a list of learners mentored by a particular mentor
*
* @apiName getLearners
* @apiGroup MentorsAPI
*
* @apiParam {String} mentor's unique id.

* @apiSuccess {Object} Containing request details which contains the learner's id
* @apiError {400} Error status with error message.
*/

/**
* @api {post} /mentors/:mentorId/requests/:requestId/accept
*
* @apiDescription
* Accept a request from a learner
*
* @apiName acceptRequest
* @apiGroup MentorsAPI
*
* @apiParam {Object} Containing mentor's unique id and learner's unique id.

* @apiSuccess {200} message: Request has been accepted
* @apiError {400} Error status with error message.
*/

/**
* @api {post} /mentors/:mentorId/requests/:requestId/decline
*
* @apiDescription
* Decline a request from a learner
*
* @apiName declineRequest
* @apiGroup MentorsAPI
*
* @apiParam {Object} Containing mentor's unique id and learner's unique id.

* @apiSuccess {200} message: Request has been declined
* @apiError {400} Error status with error message.
*/

