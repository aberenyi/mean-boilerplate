'use strict'

var Projects = require('../models/Projects')
var Users = require('../models/Users')

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
    if (err) {return res.status(500).send(err.toString())}
    var condition = user.groups.indexOf('admin') !== -1 ? {} : {groups: {$in: user.groups}}
    Projects.find(condition, function(err, projects)
    {
      if (err) {return res.status(500).send(err.toString())}
      res.send(projects);
    });
  });
}
