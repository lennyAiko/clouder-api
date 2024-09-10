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
  "leadership/create": [
    "pathLogger",
    "isAuthenticated",
    "checkIssuer",
    "verifyEmail",
    "trialAccess",
    "canCreate",
  ],
  "leadership/*": [
    "pathLogger",
    "isAuthenticated",
    "checkIssuer",
    "verifyEmail",
    "trialAccess",
  ],
  "logbook/create": [
    "pathLogger",
    "isAuthenticated",
    "checkIssuer",
    "verifyEmail",
    "canCreate",
  ],
  "logbook/*": ["pathLogger", "isAuthenticated", "checkIssuer", "verifyEmail"],
  "qualification/*": [
    "pathLogger",
    "isAuthenticated",
    "checkIssuer",
    "verifyEmail",
  ],
  "quality/*": [
    "pathLogger",
    "isAuthenticated",
    "checkIssuer",
    "verifyEmail",
    "trialAccess",
  ],
  "research/*": [
    "pathLogger",
    "isAuthenticated",
    "checkIssuer",
    "verifyEmail",
    "trialAccess",
  ],
  "teaching/*": [
    "pathLogger",
    "isAuthenticated",
    "checkIssuer",
    "verifyEmail",
    "trialAccess",
  ],
  "user/*": ["pathLogger", "isAuthenticated", "checkIssuer", "verifyEmail"],
  "admin/*": [
    "pathLogger",
    "isAuthenticated",
    "checkIssuer",
    "verifyEmail",
    "verifyAdmin",
  ],
  "feedback/create": [
    "pathLogger",
    "isAuthenticated",
    "checkIssuer",
    "verifyEmail",
  ],
  "message/send": [
    "pathLogger",
    "isAuthenticated",
    "checkIssuer",
    "verifyEmail",
  ],
  "message/*": [
    "pathLogger",
    "isAuthenticated",
    "checkIssuer",
    "verifyEmail",
    // "verifyAdmin",
  ],
};
