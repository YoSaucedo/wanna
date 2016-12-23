const color = require('./app/components/tasks/color');
/**
 * Used for changing list item texts after
 * tasks are loaded from database.
 *
 * Cast on task list items.
 */
angular.module('MainApp')
  .directive('uaf', $compile =>  // uaf = Update after find
    (scope, el, attrs) => {
      scope.$watch('openTasks', (newVal) => {
        const icon = $compile('<md-icon md-svg-src="assets/img/cube.svg" class="small md-primary"></md-icon>')(scope);
        const isOneday = (newVal[attrs.uaf].end - newVal[attrs.uaf].start) === 86400000;
        const isPeriodic = newVal[attrs.uaf].period !== -1;
        const now = Date.now();
        const isDueToday = (newVal[attrs.uaf].end - now) < 86400000;
        const isDueTomorrow = (newVal[attrs.uaf].end - now) < 86400000 * 2;
        let oneday;
        if (isOneday) {
          oneday = $compile('<md-icon md-svg-src="assets/img/one.svg" class="medium md-accent"></md-icon>')(scope);
        }
        let period;
        if (isPeriodic) {
          period = newVal[attrs.uaf].period / 86400000;
          period = $compile(`<h6 class="inline grey">${period}day${period === 1 ? '' : 's'}</h6><md-icon md-svg-src="assets/img/repeat.svg" class="small"></md-icon>`)(scope);
        }
        let dueToday = '';
        let dueTomorrow = '';
        if (isDueToday) {
          dueToday = '<p class="inline label duetoday">Due Today</p>';
        } else if (isDueTomorrow) {
          dueTomorrow = '<p class="inline label duetomorrow">Due Tomorrow</p>';
        }
        el[0].children[0].children[0].innerHTML = `<p class="inline">${newVal[attrs.uaf].text}</p>&nbsp;&nbsp;<h6 class="inline mp">${newVal[attrs.uaf].units}</h6>`;
        angular.element(el[0].children[0].children[0]).append(icon);
        angular.element(el[0].children[0].children[0]).append(oneday);
        angular.element(el[0].children[0].children[0]).append(period);
        angular.element(el[0].children[0].children[0]).append(dueToday);
        angular.element(el[0].children[0].children[0]).append(dueTomorrow);
        const borderLeft = `5px solid ${color.returnColor(newVal[attrs.uaf].start, newVal[attrs.uaf].end, Date.now())}`;
        angular.element(el[0]).css('borderLeft', borderLeft);
      });
    }
  )
  .directive('uafo', $compile =>  // uafo = Update after find, overdue
    (scope, el, attrs) => {
      scope.$watch('overdueTasks', (newVal) => {
        const icon = $compile('<md-icon md-svg-src="assets/img/cube.svg" class="small md-warn"></md-icon>')(scope);
        const isOneday = (newVal[attrs.uafo].end - newVal[attrs.uafo].start) === 86400000;
        const isPeriodic = newVal[attrs.uafo].period !== -1;
        let oneday;
        if (isOneday) {
          oneday = $compile('<md-icon md-svg-src="assets/img/one.svg" class="medium md-accent"></md-icon>')(scope);
        }
        let period;
        if (isPeriodic) {
          period = newVal[attrs.uafo].period / 86400000;
          period = $compile(`<h6 class="inline grey">${period}day${period === 1 ? '' : 's'}</h6><md-icon md-svg-src="assets/img/repeat.svg" class="small"></md-icon>`)(scope);
        }
        el[0].children[0].children[0].innerHTML = `<p class="inline">${newVal[attrs.uafo].text}</p>&nbsp;<h6 class="inline mw">${newVal[attrs.uafo].units}</h6>`;
        angular.element(el[0].children[0].children[0]).append(icon);
        angular.element(el[0].children[0].children[0]).append(oneday);
        angular.element(el[0].children[0].children[0]).append(period);
        const borderLeft = `5px solid ${color.returnColorO(newVal[attrs.uafo].start, newVal[attrs.uafo].end, Date.now())}`;
        angular.element(el[0]).css('borderLeft', borderLeft);
      });
    }
  )
  .directive('uafn', $compile =>  // uafn = Update after find, not yet
    (scope, el, attrs) => {
      scope.$watch('notYetTasks', (newVal) => {
        const icon = $compile('<md-icon md-svg-src="assets/img/cube.svg" class="small md-warn"></md-icon>')(scope);
        const isOneday = (newVal[attrs.uafn].end - newVal[attrs.uafn].start) === 86400000;
        const isPeriodic = newVal[attrs.uafn].period !== -1;
        let oneday;
        if (isOneday) {
          oneday = $compile('<md-icon md-svg-src="assets/img/one.svg" class="medium md-accent"></md-icon>')(scope);
        }
        let period;
        if (isPeriodic) {
          period = newVal[attrs.uafn].period / 86400000;
          period = $compile(`<h6 class="inline grey">${period}day${period === 1 ? '' : 's'}</h6><md-icon md-svg-src="assets/img/repeat.svg" class="small"></md-icon>`)(scope);
        }
        el[0].children[0].children[0].innerHTML = `<p class="inline">${newVal[attrs.uafn].text}</p>&nbsp;<h6 class="inline mw">${newVal[attrs.uafn].units}</h6>`;
        angular.element(el[0].children[0].children[0]).append(icon);
        angular.element(el[0].children[0].children[0]).append(oneday);
        angular.element(el[0].children[0].children[0]).append(period);
        const borderLeft = `5px solid ${color.returnColorN(newVal[attrs.uafn].start, Date.now())}`;
        angular.element(el[0]).css('borderLeft', borderLeft);
      });
    }
  );