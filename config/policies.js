/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   * '': 'single policy'                                                      *
   * '': ['multiple', 'policies]                                              *
   *                                                                          *
   ***************************************************************************/

  "auth/*": "pathLogger",
  // swagger: "pathLogger",
  "course/*": ["pathLogger", "isAuthenticated", "checkIssuer", "verifyEmail"],
  "leadership/*": [
    "pathLogger",
    "isAuthenticated",
    "checkIssuer",
    "verifyEmail",
  ],
  "logbook/*": ["pathLogger", "isAuthenticated", "checkIssuer", "verifyEmail"],
  "qualification/*": [
    "pathLogger",
    "isAuthenticated",
    "checkIssuer",
    "verifyEmail",
  ],
  "quality/*": ["pathLogger", "isAuthenticated", "checkIssuer", "verifyEmail"],
  "user/*": ["pathLogger", "isAuthenticated", "checkIssuer", "verifyEmail"],
  "admin/*": [
    "pathLogger",
    "isAuthenticated",
    "checkIssuer",
    "verifyEmail",
    "verifyAdmin",
  ],
};
