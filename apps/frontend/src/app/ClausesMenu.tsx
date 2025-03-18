import {
  DocumentEditorContainerComponent,
  TextElementBox,
} from '@syncfusion/ej2-react-documenteditor';

import { hideSpinner, showSpinner } from '@syncfusion/ej2-popups';

export enum ClauseStatus {
  active = 'active',
  inactive = 'inactive',
}

export type Clause = {
  id: string;
  title: string;
  asset: string;
  status: ClauseStatus;
};

type ClauseMenuProps = {
  clauses: Array<Clause>;
  setClauses: React.Dispatch<React.SetStateAction<Array<Clause>>>;
  documentEditor: DocumentEditorContainerComponent;
};

export const ClausesMenu = ({
  clauses,
  setClauses,
  documentEditor,
}: ClauseMenuProps) => {
  function toggleClause(clauseId: string) {
    const newClauses = clauses.map((c: Clause) => {
      if (c.id === clauseId) {
        return {
          ...c,
          status:
            c.status === ClauseStatus.active
              ? ClauseStatus.inactive
              : ClauseStatus.active,
        };
      }
      return c;
    });

    setClauses(newClauses);
  }

  async function addClauseToDocument(clause: Clause) {
    showSpinner(documentEditor.documentEditor.element);
    const asset = await fetch(`/assets/Clauses/${clause.asset}`);
    const assetBlob = (await asset.blob()) as File;
    toggleClause(clause.id);
    const rootEditor = documentEditor.documentEditor as any;
    console.log(rootEditor.editor.nodes);
    const sfdt = await rootEditor.convertToSfdt(assetBlob);
    documentEditor.documentEditor.selection.moveToDocumentEnd();
    documentEditor.documentEditor.editor.insertText('\n');
    const startOffset: string =
      documentEditor.documentEditor.selection.startOffset;
    documentEditor.documentEditor.editor.paste(sfdt);
    const endOffset: string = documentEditor.documentEditor.selection.endOffset;
    documentEditor.documentEditor.selection.select(startOffset, endOffset);
    documentEditor.documentEditor.editor.insertBookmark(clause.title);
    hideSpinner(documentEditor.documentEditor.element);
  }

  function removeClauseFromDocument(clause: Clause) {
    toggleClause(clause.id);
    documentEditor.documentEditor.selection.selectBookmark(clause.title);
    documentEditor.documentEditor.editor.delete();
    documentEditor.documentEditor.editor.deleteBookmark(clause.id);
  }

  return (
    <div className="p-4">
      {clauses.map((clause) => {
        return (
          <div key={clause.id}>
            <h1 className="font-bold text-md">{clause.title}</h1>
            {clause.status === ClauseStatus.inactive ? (
              <button
                onClick={() => addClauseToDocument(clause)}
                className="bg-blue-500 py-2 px-4 rounded text-white text-sm"
              >
                Add Clause
              </button>
            ) : (
              <button
                onClick={() => removeClauseFromDocument(clause)}
                className="bg-red-500 py-2 px-4 rounded text-white text-sm"
              >
                Remove Clause
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};
