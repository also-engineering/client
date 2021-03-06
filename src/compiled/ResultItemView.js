var ResultItemView;

ResultItemView = Backbone.Marionette.CompositeView.extend({
  className: "result_view",
  events: {
    'click .save': 'save',
    'click .another': 'another'
  },
  another: function() {
    return window.location.reload();
  },
  save: function() {
    var $button;
    this.model.add({
      name: "Assessment complete",
      prototype: "complete",
      data: {
        "comment": this.$el.find('#additional-comments').val() || "",
        "end_time": (new Date()).getTime()
      },
      subtestId: "result",
      sum: {
        correct: 1,
        incorrect: 0,
        missing: 0,
        total: 1
      }
    });
    if (this.model.save()) {
      Tangerine.activity = "";
      Utils.midAlert(this.text.saved);
      this.$el.find('.save_status').html(this.text.saved);
      this.$el.find('.save_status').removeClass('not_saved');
      this.$el.find('.question').fadeOut(250);
      $button = this.$el.find("button.save");
      return $button.removeClass('save').addClass('another').html(this.text.another);
    } else {
      Utils.midAlert("Save error");
      return this.$el.find('.save_status').html("Results may not have saved");
    }
  },
  i18n: function() {
    return this.text = {
      "assessmentComplete": t("ResultView.label.assessment_complete"),
      "comments": t("ResultView.label.comments"),
      "subtestsCompleted": t("ResultView.label.subtests_completed"),
      "save": t("ResultView.button.save"),
      "another": t("ResultView.button.another"),
      "saved": t("ResultView.message.saved"),
      "notSaved": t("ResultView.message.not_saved")
    };
  },
  initialize: function(options) {
    this.i18n();
    this.model = options.model;
    this.assessment = options.assessment;
    this.saved = false;
    return this.resultSumView = new ResultSumView({
      model: this.model.parent.result,
      finishCheck: false
    });
  },
  render: function() {
    $(".subtest-next").hide();
    this.$el.html("<h2>" + this.text.assessmentComplete + "</h2> <button class='save command'>" + this.text.save + "</button> <div class='info_box save_status not_saved'>" + this.text.notSaved + "</div> <br> <div class='question'> <label class='prompt' for='additional-comments'>" + this.text.comments + "</label> <textarea id='additional-comments' class='full_width'></textarea> </div> <div class='label_value'> <h2>" + this.text.subtestsCompleted + "</h2> <div id='result_sum' class='info_box'></div> </div>");
    this.resultSumView.setElement(this.$el.find("#result_sum"));
    this.resultSumView.render();
    return this.trigger("rendered");
  },
  onClose: function() {
    return this.resultSumView.close();
  }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvcmVzdWx0L1Jlc3VsdEl0ZW1WaWV3LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLGNBQUEsR0FBa0IsUUFBUSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsTUFBbEMsQ0FFaEI7RUFBQSxTQUFBLEVBQVcsYUFBWDtFQUVBLE1BQUEsRUFDRTtJQUFBLGFBQUEsRUFBbUIsTUFBbkI7SUFDQSxnQkFBQSxFQUFtQixTQURuQjtHQUhGO0VBTUEsT0FBQSxFQUFTLFNBQUE7V0FDUCxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQWhCLENBQUE7RUFETyxDQU5UO0VBVUEsSUFBQSxFQUFNLFNBQUE7QUFDSixRQUFBO0lBQUEsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQ0U7TUFBQSxJQUFBLEVBQU8scUJBQVA7TUFDQSxTQUFBLEVBQVcsVUFEWDtNQUVBLElBQUEsRUFDRTtRQUFBLFNBQUEsRUFBWSxJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsQ0FBVSxzQkFBVixDQUFpQyxDQUFDLEdBQWxDLENBQUEsQ0FBQSxJQUEyQyxFQUF2RDtRQUNBLFVBQUEsRUFBYSxDQUFLLElBQUEsSUFBQSxDQUFBLENBQUwsQ0FBWSxDQUFDLE9BQWIsQ0FBQSxDQURiO09BSEY7TUFLQSxTQUFBLEVBQVksUUFMWjtNQU1BLEdBQUEsRUFDRTtRQUFBLE9BQUEsRUFBVSxDQUFWO1FBQ0EsU0FBQSxFQUFZLENBRFo7UUFFQSxPQUFBLEVBQVUsQ0FGVjtRQUdBLEtBQUEsRUFBUSxDQUhSO09BUEY7S0FERjtJQWFBLElBQUcsSUFBQyxDQUFBLEtBQUssQ0FBQyxJQUFQLENBQUEsQ0FBSDtNQUNFLFNBQVMsQ0FBQyxRQUFWLEdBQXFCO01BQ3JCLEtBQUssQ0FBQyxRQUFOLENBQWUsSUFBQyxDQUFBLElBQUksQ0FBQyxLQUFyQjtNQUNBLElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBTCxDQUFVLGNBQVYsQ0FBeUIsQ0FBQyxJQUExQixDQUErQixJQUFDLENBQUEsSUFBSSxDQUFDLEtBQXJDO01BQ0EsSUFBQyxDQUFBLEdBQUcsQ0FBQyxJQUFMLENBQVUsY0FBVixDQUF5QixDQUFDLFdBQTFCLENBQXNDLFdBQXRDO01BQ0EsSUFBQyxDQUFBLEdBQUcsQ0FBQyxJQUFMLENBQVUsV0FBVixDQUFzQixDQUFDLE9BQXZCLENBQStCLEdBQS9CO01BRUEsT0FBQSxHQUFVLElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBTCxDQUFVLGFBQVY7YUFFVixPQUFPLENBQUMsV0FBUixDQUFvQixNQUFwQixDQUEyQixDQUFDLFFBQTVCLENBQXFDLFNBQXJDLENBQStDLENBQUMsSUFBaEQsQ0FBcUQsSUFBQyxDQUFBLElBQUksQ0FBQyxPQUEzRCxFQVRGO0tBQUEsTUFBQTtNQVdFLEtBQUssQ0FBQyxRQUFOLENBQWUsWUFBZjthQUNBLElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBTCxDQUFVLGNBQVYsQ0FBeUIsQ0FBQyxJQUExQixDQUErQiw0QkFBL0IsRUFaRjs7RUFkSSxDQVZOO0VBdUNBLElBQUEsRUFBTSxTQUFBO1dBQ0osSUFBQyxDQUFBLElBQUQsR0FDRTtNQUFBLG9CQUFBLEVBQXVCLENBQUEsQ0FBRSxzQ0FBRixDQUF2QjtNQUNBLFVBQUEsRUFBdUIsQ0FBQSxDQUFFLDJCQUFGLENBRHZCO01BRUEsbUJBQUEsRUFBdUIsQ0FBQSxDQUFFLHFDQUFGLENBRnZCO01BSUEsTUFBQSxFQUF1QixDQUFBLENBQUUsd0JBQUYsQ0FKdkI7TUFLQSxTQUFBLEVBQXVCLENBQUEsQ0FBRSwyQkFBRixDQUx2QjtNQU9BLE9BQUEsRUFBdUIsQ0FBQSxDQUFFLDBCQUFGLENBUHZCO01BUUEsVUFBQSxFQUF1QixDQUFBLENBQUUsOEJBQUYsQ0FSdkI7O0VBRkUsQ0F2Q047RUFvREEsVUFBQSxFQUFZLFNBQUUsT0FBRjtJQUVWLElBQUMsQ0FBQSxJQUFELENBQUE7SUFFQSxJQUFDLENBQUEsS0FBRCxHQUFTLE9BQU8sQ0FBQztJQUNqQixJQUFDLENBQUEsVUFBRCxHQUFjLE9BQU8sQ0FBQztJQUN0QixJQUFDLENBQUEsS0FBRCxHQUFTO1dBQ1QsSUFBQyxDQUFBLGFBQUQsR0FBcUIsSUFBQSxhQUFBLENBQ25CO01BQUEsS0FBQSxFQUFjLElBQUMsQ0FBQSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQTVCO01BQ0EsV0FBQSxFQUFjLEtBRGQ7S0FEbUI7RUFQWCxDQXBEWjtFQStEQSxNQUFBLEVBQVEsU0FBQTtJQUNOLENBQUEsQ0FBRSxlQUFGLENBQWtCLENBQUMsSUFBbkIsQ0FBQTtJQUNBLElBQUMsQ0FBQSxHQUFHLENBQUMsSUFBTCxDQUFVLE1BQUEsR0FDRixJQUFDLENBQUEsSUFBSSxDQUFDLGtCQURKLEdBQ3VCLHFDQUR2QixHQUd1QixJQUFDLENBQUEsSUFBSSxDQUFDLElBSDdCLEdBR2tDLHdEQUhsQyxHQUlzQyxJQUFDLENBQUEsSUFBSSxDQUFDLFFBSjVDLEdBSXFELHFGQUpyRCxHQVE0QyxJQUFDLENBQUEsSUFBSSxDQUFDLFFBUmxELEdBUTJELGtIQVIzRCxHQWFBLElBQUMsQ0FBQSxJQUFJLENBQUMsaUJBYk4sR0Fhd0IsMkRBYmxDO0lBa0JBLElBQUMsQ0FBQSxhQUFhLENBQUMsVUFBZixDQUEwQixJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsQ0FBVSxhQUFWLENBQTFCO0lBQ0EsSUFBQyxDQUFBLGFBQWEsQ0FBQyxNQUFmLENBQUE7V0FFQSxJQUFDLENBQUEsT0FBRCxDQUFTLFVBQVQ7RUF2Qk0sQ0EvRFI7RUF3RkEsT0FBQSxFQUFTLFNBQUE7V0FDUCxJQUFDLENBQUEsYUFBYSxDQUFDLEtBQWYsQ0FBQTtFQURPLENBeEZUO0NBRmdCIiwiZmlsZSI6Im1vZHVsZXMvcmVzdWx0L1Jlc3VsdEl0ZW1WaWV3LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiUmVzdWx0SXRlbVZpZXcgPSAgQmFja2JvbmUuTWFyaW9uZXR0ZS5Db21wb3NpdGVWaWV3LmV4dGVuZFxuXG4gIGNsYXNzTmFtZTogXCJyZXN1bHRfdmlld1wiXG5cbiAgZXZlbnRzOlxuICAgICdjbGljayAuc2F2ZScgICAgOiAnc2F2ZSdcbiAgICAnY2xpY2sgLmFub3RoZXInIDogJ2Fub3RoZXInXG5cbiAgYW5vdGhlcjogLT5cbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcbiAgICAjVGFuZ2VyaW5lLnJvdXRlci5uYXZpZ2F0ZSBcInJlc3RhcnQvI3tAYXNzZXNzbWVudC5pZH1cIiwgdHJ1ZVxuXG4gIHNhdmU6IC0+XG4gICAgQG1vZGVsLmFkZFxuICAgICAgbmFtZSA6IFwiQXNzZXNzbWVudCBjb21wbGV0ZVwiXG4gICAgICBwcm90b3R5cGU6IFwiY29tcGxldGVcIlxuICAgICAgZGF0YSA6XG4gICAgICAgIFwiY29tbWVudFwiIDogQCRlbC5maW5kKCcjYWRkaXRpb25hbC1jb21tZW50cycpLnZhbCgpIHx8IFwiXCJcbiAgICAgICAgXCJlbmRfdGltZVwiIDogKG5ldyBEYXRlKCkpLmdldFRpbWUoKVxuICAgICAgc3VidGVzdElkIDogXCJyZXN1bHRcIlxuICAgICAgc3VtIDpcbiAgICAgICAgY29ycmVjdCA6IDFcbiAgICAgICAgaW5jb3JyZWN0IDogMFxuICAgICAgICBtaXNzaW5nIDogMFxuICAgICAgICB0b3RhbCA6IDFcblxuICAgIGlmIEBtb2RlbC5zYXZlKClcbiAgICAgIFRhbmdlcmluZS5hY3Rpdml0eSA9IFwiXCJcbiAgICAgIFV0aWxzLm1pZEFsZXJ0IEB0ZXh0LnNhdmVkXG4gICAgICBAJGVsLmZpbmQoJy5zYXZlX3N0YXR1cycpLmh0bWwgQHRleHQuc2F2ZWRcbiAgICAgIEAkZWwuZmluZCgnLnNhdmVfc3RhdHVzJykucmVtb3ZlQ2xhc3MoJ25vdF9zYXZlZCcpXG4gICAgICBAJGVsLmZpbmQoJy5xdWVzdGlvbicpLmZhZGVPdXQoMjUwKVxuXG4gICAgICAkYnV0dG9uID0gQCRlbC5maW5kKFwiYnV0dG9uLnNhdmVcIilcblxuICAgICAgJGJ1dHRvbi5yZW1vdmVDbGFzcygnc2F2ZScpLmFkZENsYXNzKCdhbm90aGVyJykuaHRtbCBAdGV4dC5hbm90aGVyXG4gICAgZWxzZVxuICAgICAgVXRpbHMubWlkQWxlcnQgXCJTYXZlIGVycm9yXCJcbiAgICAgIEAkZWwuZmluZCgnLnNhdmVfc3RhdHVzJykuaHRtbCBcIlJlc3VsdHMgbWF5IG5vdCBoYXZlIHNhdmVkXCJcblxuXG4gIGkxOG46IC0+XG4gICAgQHRleHQgPVxuICAgICAgXCJhc3Nlc3NtZW50Q29tcGxldGVcIiA6IHQoXCJSZXN1bHRWaWV3LmxhYmVsLmFzc2Vzc21lbnRfY29tcGxldGVcIilcbiAgICAgIFwiY29tbWVudHNcIiAgICAgICAgICAgOiB0KFwiUmVzdWx0Vmlldy5sYWJlbC5jb21tZW50c1wiKVxuICAgICAgXCJzdWJ0ZXN0c0NvbXBsZXRlZFwiICA6IHQoXCJSZXN1bHRWaWV3LmxhYmVsLnN1YnRlc3RzX2NvbXBsZXRlZFwiKVxuXG4gICAgICBcInNhdmVcIiAgICAgICAgICAgICAgIDogdChcIlJlc3VsdFZpZXcuYnV0dG9uLnNhdmVcIilcbiAgICAgIFwiYW5vdGhlclwiICAgICAgICAgICAgOiB0KFwiUmVzdWx0Vmlldy5idXR0b24uYW5vdGhlclwiKVxuXG4gICAgICBcInNhdmVkXCIgICAgICAgICAgICAgIDogdChcIlJlc3VsdFZpZXcubWVzc2FnZS5zYXZlZFwiKVxuICAgICAgXCJub3RTYXZlZFwiICAgICAgICAgICA6IHQoXCJSZXN1bHRWaWV3Lm1lc3NhZ2Uubm90X3NhdmVkXCIpXG5cblxuICBpbml0aWFsaXplOiAoIG9wdGlvbnMgKSAtPlxuXG4gICAgQGkxOG4oKVxuXG4gICAgQG1vZGVsID0gb3B0aW9ucy5tb2RlbFxuICAgIEBhc3Nlc3NtZW50ID0gb3B0aW9ucy5hc3Nlc3NtZW50XG4gICAgQHNhdmVkID0gZmFsc2VcbiAgICBAcmVzdWx0U3VtVmlldyA9IG5ldyBSZXN1bHRTdW1WaWV3XG4gICAgICBtb2RlbCAgICAgICA6IEBtb2RlbC5wYXJlbnQucmVzdWx0XG4gICAgICBmaW5pc2hDaGVjayA6IGZhbHNlXG5cbiAgcmVuZGVyOiAtPlxuICAgICQoXCIuc3VidGVzdC1uZXh0XCIpLmhpZGUoKVxuICAgIEAkZWwuaHRtbCBcIlxuICAgICAgPGgyPiN7QHRleHQuYXNzZXNzbWVudENvbXBsZXRlfTwvaDI+XG5cbiAgICAgIDxidXR0b24gY2xhc3M9J3NhdmUgY29tbWFuZCc+I3tAdGV4dC5zYXZlfTwvYnV0dG9uPlxuICAgICAgPGRpdiBjbGFzcz0naW5mb19ib3ggc2F2ZV9zdGF0dXMgbm90X3NhdmVkJz4je0B0ZXh0Lm5vdFNhdmVkfTwvZGl2PlxuICAgICAgPGJyPlxuXG4gICAgICA8ZGl2IGNsYXNzPSdxdWVzdGlvbic+XG4gICAgICAgIDxsYWJlbCBjbGFzcz0ncHJvbXB0JyBmb3I9J2FkZGl0aW9uYWwtY29tbWVudHMnPiN7QHRleHQuY29tbWVudHN9PC9sYWJlbD5cbiAgICAgICAgPHRleHRhcmVhIGlkPSdhZGRpdGlvbmFsLWNvbW1lbnRzJyBjbGFzcz0nZnVsbF93aWR0aCc+PC90ZXh0YXJlYT5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPSdsYWJlbF92YWx1ZSc+XG4gICAgICAgIDxoMj4je0B0ZXh0LnN1YnRlc3RzQ29tcGxldGVkfTwvaDI+XG4gICAgICAgIDxkaXYgaWQ9J3Jlc3VsdF9zdW0nIGNsYXNzPSdpbmZvX2JveCc+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBcIlxuXG4gICAgQHJlc3VsdFN1bVZpZXcuc2V0RWxlbWVudChAJGVsLmZpbmQoXCIjcmVzdWx0X3N1bVwiKSlcbiAgICBAcmVzdWx0U3VtVmlldy5yZW5kZXIoKVxuXG4gICAgQHRyaWdnZXIgXCJyZW5kZXJlZFwiXG5cbiAgb25DbG9zZTogLT5cbiAgICBAcmVzdWx0U3VtVmlldy5jbG9zZSgpXG4iXX0=
