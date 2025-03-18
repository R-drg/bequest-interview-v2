import {
  DocumentEditorContainerComponent,
  Toolbar,
} from '@syncfusion/ej2-react-documenteditor';
DocumentEditorContainerComponent.Inject(Toolbar);

registerLicense(
  'Ngo9BigBOggjHTQxAR8/V1NMaF1cXmhNYVJ2WmFZfVtgdV9DZVZUTGYuP1ZhSXxWdkZiWH9fdXJVR2BaWEE='
);

import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-lists/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-splitbuttons/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';
import '@syncfusion/ej2-react-documenteditor/styles/material.css';
import { registerLicense } from '@syncfusion/ej2-base';
import { Clause, ClausesMenu, ClauseStatus } from './ClausesMenu';
import { useState } from 'react';
import { clausesList } from '../constants/clauses';

export const DocumentEditor = () => {
  const [clauses, setClauses] = useState<Array<Clause>>(
    clausesList.map((c) => ({ ...c, status: ClauseStatus.inactive }))
  );
  const [documentEditor, setDocumentEditor] =
    useState<DocumentEditorContainerComponent | null>();

  return (
    <div className="flex size-full box-border">
      <div className="justify-center px-24 bg-gray-300 pt-12 h-screen w-full overflow-hidden">
        <DocumentEditorContainerComponent
          height="calc(100vh - 125px)"
          serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
          enableToolbar={true}
          showPropertiesPane={false}
          enableLocalPaste={true}
          toolbarItems={[
            'New',
            'Open',
            'Separator',
            'Undo',
            'Redo',
            'Separator',
            'Bookmark',
            'Table',
            'Separator',
            'Find',
          ]}
          ref={(scope: DocumentEditorContainerComponent) => {
            setDocumentEditor(scope);
          }}
        />
      </div>
      <div className="min-w-96 h-full">
        {documentEditor && (
          <ClausesMenu
            clauses={clauses}
            setClauses={setClauses}
            documentEditor={documentEditor}
          />
        )}
      </div>
    </div>
  );
};
