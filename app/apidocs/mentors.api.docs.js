/**
* @api {get} /mentors/:mentorId Get a mentor's details
* @apiName GetMentor
* @apiGroup MentorsAPI
*
* @apiParam {String} mentorId mentor's unique id.
*
* @apiSuccess {Object} mentor object containing all mentor's details
* @apiError {404} MentorNotFound The <code>id</code> supplied doesn't match any mentor
*/
