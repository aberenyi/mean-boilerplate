var Projects = require('../models/Projects'),
  Users = require('../models/Users');

module.exports =
{
  getProjects: getProjects
};

/**
 * List projects that the user has access to.
 * @param req
 * @param res
 */
function getProjects(req, res)
{
  Users.findOne({uid: req.user.uid}, {groups: 1}, function(err, user)
  {
    Projects.find({groups: {$in: user.groups}}, {}, function(err, projects)
    {
      res.send(projects);
    });
  });
}
