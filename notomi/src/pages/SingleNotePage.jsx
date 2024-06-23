import React, { useContext, useRef } from 'react';
import editContext from '../contexts/edit/editContext';
import { Editor } from '@tinymce/tinymce-react';
import NoteContext from '../contexts/notes/noteContext';

const SingleNotePage = () => {
  const { singleNoteDetail, setSingleNoteDetail } = useContext(editContext);
  const { editNote } = useContext(NoteContext);
  const editorRef = useRef(null);

  const parseContentToObject = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const tags = Array.from(doc.querySelectorAll('.badge')).map(tag => tag.textContent);
    return {
      title: doc.querySelector('h1')?.textContent || '',
      description: doc.querySelector('p')?.textContent || '',
      tags
    };
  };

  const log = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      const contentObject = parseContentToObject(content);
      setSingleNoteDetail({
        ...singleNoteDetail,
        description: contentObject.description,
        title: contentObject.title,
        tags: contentObject.tags
      });
      editNote({
        ...singleNoteDetail,
        description: contentObject.description,
        title: contentObject.title,
        tags: contentObject.tags
      });
    }
    console.log("Updated Note", singleNoteDetail);
  };

  return (
    <>
      <Editor
        apiKey='pm6ad33k0gvgq5xtq1p6tm7zmag2ew5qtsau05d2kdv0x43i'
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue={`<div className="d-flex flex-column justify-content-between"><h1>${singleNoteDetail.title}</h1><p>${singleNoteDetail.description}</p> <p>${singleNoteDetail.tags.map(tag => 
          `<span class="badge mr-1" style="background-color:#3E64FF; color: #fff; border-radius: 7px; padding: 0.5em; width:fit-content;">${tag}</span>`
        ).join(' ')}</p> </div>`}
        init={{
          height: 700,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | bold italic forecolor | ' +
                   'alignleft aligncenter alignright alignjustify | ' +
                   'bullist numlist outdent indent | removeformat | help | saveButton',
          setup: (editor) => {
            editor.ui.registry.addButton('saveButton', {
              text: 'Save',
              onAction: log
            });

            editor.addShortcut('ctrl+s', 'Save Note', () => {
              log();
              return false;
            });
          },
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
    </>
  );
};

export default SingleNotePage;
