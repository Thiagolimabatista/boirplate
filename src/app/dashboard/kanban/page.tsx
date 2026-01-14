import { CONFIG } from 'src/config-global';

import { KanbanView } from 'src/sections/kanban/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Kanban | Dashboard ` };

export default function Page() {
  return <KanbanView />;
}
