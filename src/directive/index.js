import hasPermi from './permission/hasPermi';

export default function directive(app) {
  app.directive('hasPermi', hasPermi);
}
