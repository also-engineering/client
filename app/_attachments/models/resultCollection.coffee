class ResultCollection extends Backbone.Collection

  model: Result

  replicate: (target,options) ->
    target = target + "/" + @databaseName
    $("#message").html "Syncing to #{target}"
    $.couch.db(@databaseName).saveDoc
      type: "replicationLog"
      timestamp: new Date().getTime()
      source: @databaseName
      target: target

    $.couch.login
      name: Tangerine.config.user_with_database_create_permission
      password: Tangerine.config.password_with_database_create_permission
      success: ->
        $.couch.replicate @databaseName, target, =>
          success: ->
            options.success()
            $.couch.logout()
            Tangerine.router.navigate("login", true)
            window.location.reload(true)
          error: (res) ->
            $("#message").html "Error: #{res}"
            $.couch.logout()
            Tangerine.router.navigate("login", true)
            window.location.reload(true)
            



  lastCloudReplication: (options) ->
    $.couch.db(@databaseName).view "reports/replicationLog",
      success: (result) ->
        latestTimestamp = _.max(_.pluck(result.rows, "key"))
        if latestTimestamp?
          _.each result.rows, (row) ->
            if row.key == latestTimestamp
              options.success(row.value)
        else
          options.error()
