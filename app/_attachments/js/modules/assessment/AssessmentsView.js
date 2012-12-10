var AssessmentsView,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

AssessmentsView = (function(_super) {

  __extends(AssessmentsView, _super);

  function AssessmentsView() {
    this.render = __bind(this.render, this);
    AssessmentsView.__super__.constructor.apply(this, arguments);
  }

  AssessmentsView.prototype.tagName = "div";

  AssessmentsView.prototype.events = {
    "click .toggle_archived": "toggleArchived"
  };

  AssessmentsView.prototype.toggleArchived = function(event) {
    var $container;
    if (this.archivedIsVisible) {
      this.archivedIsVisible = false;
      $container = this.$el.find(".archived_list").addClass("confirmation");
      this.$el.find(".toggle_archived").html("Show");
    } else {
      this.archivedIsVisible = true;
      $container = this.$el.find(".archived_list").removeClass("confirmation");
      this.$el.find(".toggle_archived").html("Hide");
    }
    return $container.fadeToggle(150);
  };

  AssessmentsView.prototype.initialize = function(options) {
    options.assessments.on("add destroy update", this.render);
    this.parent = options.parent;
    this.group = options.group;
    this.assessments = options.assessments;
    this.homeGroup = options.homeGroup;
    this.isPublic = this.group === "public";
    this.ignoringGroups = this.group === false;
    this.groupName = this.isPublic ? "Public" : this.group;
    this.subviews = [];
    return this.archivedIsVisible = false;
  };

  AssessmentsView.prototype.render = function(event) {
    var $ul, activeViews, archivedContainer, archivedViews, assessment, assessments, header, newView, showArchived, showGroupName, view, _i, _j, _k, _len, _len2, _len3;
    this.closeViews();
    if (this.group !== false) {
      assessments = this.assessments.where({
        "group": this.group
      });
    } else {
      assessments = this.assessments.models;
    }
    activeViews = [];
    archivedViews = [];
    for (_i = 0, _len = assessments.length; _i < _len; _i++) {
      assessment = assessments[_i];
      newView = new AssessmentListElementView({
        "model": assessment,
        "homeGroup": this.homeGroup,
        "group": this.group,
        "showAll": this.showAll
      });
      if (assessment.isArchived() && Tangerine.settings.context === "server") {
        archivedViews.push(newView);
      } else {
        activeViews.push(newView);
      }
    }
    this.subviews = archivedViews.concat(activeViews);
    if (this.subviews.length === 0 && !this.isPublic) {
      this.$el.html("<p class='grey'>No assessments yet. Click <b>new</b> to get started.</p>");
      this.trigger("rendered");
      return;
    }
    header = "      <h2 class='header_" + this.cid + "'>" + this.groupName + " (" + activeViews.length + ")</h2>    ";
    archivedContainer = "      <div class='archived_container'>        <h2>Archived (" + archivedViews.length + ") <button class='command toggle_archived'>Show</button></h2>        <ul class='archived_list confirmation'></ul>      </div>    ";
    showArchived = archivedViews.length !== 0 && !this.isPublic;
    showGroupName = !this.ignoringGroups;
    this.$el.html("      " + (showGroupName ? header : "") + "      <ul class='active_list assessment_list'></ul>      " + (showArchived ? archivedContainer : "") + "          ");
    $ul = this.$el.find(".active_list");
    for (_j = 0, _len2 = activeViews.length; _j < _len2; _j++) {
      view = activeViews[_j];
      view.render();
      $ul.append(view.el);
    }
    if (showArchived) {
      $ul = this.$el.find(".archived_list");
      for (_k = 0, _len3 = archivedViews.length; _k < _len3; _k++) {
        view = archivedViews[_k];
        view.render();
        $ul.append(view.el);
      }
    }
    return this.trigger("rendered");
  };

  AssessmentsView.prototype.closeViews = function() {
    var view, _i, _len, _ref;
    _ref = this.subviews;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      view = _ref[_i];
      view.close();
    }
    return this.subviews = [];
  };

  AssessmentsView.prototype.onClose = function() {
    return this.closeViews();
  };

  return AssessmentsView;

})(Backbone.View);
