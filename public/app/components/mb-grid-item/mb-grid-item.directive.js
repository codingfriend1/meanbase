angular.module('meanbaseApp')
  .directive('mbGridItem', function ($rootScope, endpoints, $timeout) {
    return {
      // template: '<div ng-if="$root.editMode" class="add-to-grid-btn"><i class="fa fa-plus fa-lg"></i></div>',
      restrict: 'A',
      scope: {
        item: '='
      },
      link: function (scope, element, attrs) {

        if(!scope.item.gridClasses) {
          scope.item.gridClasses = element[0].className.replace('ng-scope', '').replace('ng-isolate-scope', '').replace('ui-resizable', '');;
        }
        element[0].className = scope.item.gridClasses;

        if(!$rootScope.isLoggedIn) { return false; }

        var originalClasses;
        scope.$onRootScope('cms.editMode', function(e, value) {
          if(!value) {
            $(element).resizable('disable');
          } else {
            originalClasses = element[0].className;
            originalClasses = originalClasses.replace('ng-scope', '').replace('ng-isolate-scope', '').replace('ui-resizable', '');
            $(element).resizable('enable');
          }
        });

        scope.$onRootScope('cms.saveEdits', function(event, value) {
          var classes = element[0].className;
          scope.item.gridClasses = classes;
          originalClasses = classes;
        });

        scope.$onRootScope('cms.saveListItem', function(event, value) {
          var classes = element[0].className;
          scope.item.gridClasses = classes;
        });

        (function() {

          // Bootstrap grid system array
          var gridsystem = [{
            grid: 8.33333333,
            col: 1
          }, {
            grid: 16.66666667,
            col: 2
          }, {
            grid: 25,
            col: 3
          }, {
            grid: 33.33333333,
            col: 4
          }, {
            grid: 41.66666667,
            col: 5
          }, {
            grid: 50,
            col: 6
          }, {
            grid: 58.33333333,
            col: 7
          }, {
            grid: 66.66666667,
            col: 8
          }, {
            grid: 75,
            col: 9
          }, {
            grid: 83.33333333,
            col: 10
          }, {
            grid: 100,
            col: 11
          }, {
            grid: 91.66666667,
            col: 12
          }, {
            grid: 10000,
            col: 10000
          }];

          // find the closest number from Bootstrap grid
          function getClosest(arr, value) {
            var closest, mindiff = null;

            for (var i = 0; i < arr.length; ++i) {
              var diff = Math.abs(arr[i].grid - value);

              if (mindiff === null || diff < mindiff) {
                // first value or trend decreasing
                closest = i;
                mindiff = diff;
              } else {
                // trend will increase from this point onwards
                //return arr[closest]; //object
                return arr[closest]['col']; // col number
                //return arr[closest]['grid']; // col percentage

              }
            }
            return null;
          }

          function getCurrentColumnWidth(element, rejex, alsoCheck) {
            var answer;
            var columnNumber = element.attr('class').match(rejex);

            if(!columnNumber) {
              for (var i = 0; i < alsoCheck.length; i++) {
                columnNumber = element.attr('class').match(alsoCheck[i]);
                if(columnNumber) { break; }
              }
            }
            if(!columnNumber) { answer = 12; } else {
              answer = parseInt(columnNumber[1]);
            }
            return answer;
          }

          var smClass = "col-sm-1 col-sm-2 col-sm-3 col-sm-4 col-sm-5 col-sm-6 col-sm-7 col-sm-8 col-sm-9 col-sm-10 col-sm-11 col-sm-12";
          var mdClass = "col-md-1 col-md-2 col-md-3 col-md-4 col-md-5 col-md-6 col-md-7 col-md-8 col-md-9 col-md-10 col-md-11 col-md-12";
          var lgClass = "col-lg-1 col-lg-2 col-lg-3 col-lg-4 col-lg-5 col-lg-6 col-lg-7 col-lg-8 col-lg-9 col-lg-10 col-lg-11 col-lg-12";
          var xsClass = "col-xs-1 col-xs-2 col-xs-3 col-xs-4 col-xs-5 col-xs-6 col-xs-7 col-xs-8 col-xs-9 col-xs-10 col-xs-11 col-xs-12";

          var xsRegex = /col-xs-(\d+)/;
          var smRegex = /col-sm-(\d+)/;
          var mdRegex = /col-md-(\d+)/;
          var lgRegex = /col-lg-(\d+)/;


          $(element).resizable({
            handles: "e",
            resize: function(e, ui) { // pas besoin pour l'instant

              var query = '', classClass = '', rejex, alsoCheck;
              if($rootScope.windowWidth <=767) {
                query = 'col-xs-';
                rejex = xsRegex;
                alsoCheck = [];
                classClass = xsClass;
              } else if($rootScope.windowWidth > 767 && $rootScope.windowWidth < 993) {
                query = 'col-sm-';
                rejex = smRegex;
                alsoCheck = [xsRegex];
                classClass = smClass;
              } else if ($rootScope.windowWidth >=993 && $rootScope.windowWidth < 1200) {
                query = 'col-md-';
                rejex = mdRegex;
                alsoCheck = [smRegex, xsRegex];
                classClass = mdClass;
              } else if($rootScope.windowWidth > 1200) {
                classClass = lgClass;
                query = 'col-lg-';
                rejex = lgRegex;
                alsoCheck = [mdRegex, smRegex, xsRegex];
              }

              var el = $(this);

              var beforeColNumber = getCurrentColumnWidth(el, rejex, alsoCheck);

              var container = el.parent();

              var cellPercentWidth = 100 * ui.originalElement.outerWidth() / container.innerWidth();

              var newColNum = getClosest(gridsystem, cellPercentWidth);
              var el = $(this);

              el.css("width", '');

              if(beforeColNumber === newColNum) { return false; }

              var currentTopPosition = el.position().top

              var nextColumnEl = el.next('[mb-grid-item]');

              if(nextColumnEl && nextColumnEl.length > 0) {
                var nextTopPosition = nextColumnEl.position().top;

                if(nextTopPosition === currentTopPosition) {
                  try {
                    var nextNumber = getCurrentColumnWidth(nextColumnEl, rejex, alsoCheck);

                    if(nextNumber) {
                      if(beforeColNumber > newColNum) {
                        if(nextNumber+1 <= 12) {
                          nextNumber = nextNumber+1;
                        } else {
                          nextNumber = nextNumber;
                        }
                      } else {
                        if(nextNumber-1 > 0) {
                          nextNumber = nextNumber-1;
                        } else {
                          nextNumber = nextNumber;
                        }
                      }

                      nextColumnEl.removeClass(classClass);
                      nextColumnEl.addClass(query + nextNumber.toString());
                    }
                  } catch(err) {
                    console.log('err', err);
                  }
                }
              }

              el.removeClass(classClass);
              el.addClass(query + newColNum);
              beforeColNumber = getCurrentColumnWidth(el, rejex, alsoCheck);
              $timeout(function() {
                scope.item.gridClasses = el[0].className;
              });
            }
          });
        })();

      }
    }

  });
