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
  "course/*": ["pathLogger", "isAuthenticated", "checkIssuer"],
  "leadership/*": ["pathLogger", "isAuthenticated", "checkIssuer"],
  "logbook/*": ["pathLogger", "isAuthenticated", "checkIssuer"],
  "qualification/*": ["pathLogger", "isAuthenticated", "checkIssuer"],
  "quality/*": ["pathLogger", "isAuthenticated", "checkIssuer"],
  "user/*": ["pathLogger", "isAuthenticated", "checkIssuer"],
};
