
/**
* @api {get} /seed /seed - Loads seed data into db
* @apiName seed
* @apiGroup AdminAPI
* @apiDescription Loads seed data into db
*
* @apiSuccess {object} object a message saying done
* @apiError {403} Unathorized Invalid auth
**/

/**
* @api {get} /approve?status= /approve - approve or remove a mentor
* @apiName approveMentor
* @apiGroup AdminAPI
* @apiDescription approves or removes a mentor
* @apiParam {sting} [status] default is 'true' which approves a mentor; 'false' removes a mentor
*
* @apiSuccess {object} object status message and the updated account
* @apiError {403} Unathorized Invalid auth
**/

/**
* @api {get} /delete?id='' /delete - deactivates an account
* @apiName deleteAcc
* @apiGroup AdminAPI
* @apiDescription deactivates an account (sets it to inactive)
* @apiParam {string} [id] id of the account to be deleted
*
* @apiSuccess {object} object status message and the updated account
* @apiError {403} Unathorized Invalid auth
* @apiError {404} acct with id not found
**/

/**
* @api {get} /reactivate?id='' /reactivate - reactivates an account
* @apiName reactivate
* @apiGroup AdminAPI
* @apiDescription reactivate an account (sets it to active)
* @apiParam {string} [id] id of the account to be reactivated
*
* @apiSuccess {object} object status message and the updated account
* @apiError {403} Unathorized Invalid auth
* @apiError {404} acct with id not found
**/
