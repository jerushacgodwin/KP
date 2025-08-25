import React, { useEffect, useState } from 'react';
import SectionEditor from './TiptapEditor';
import SimpleEditor from './TiptapEditor';
import RichEditor from './TiptapEditor';

const DynamicPostSections  = ({ onChange, initialSections = [], readOnly = false }: { onChange?: (sections: any[]) => void; initialSections?: any[]; readOnly?: boolean }) => {
 const [sections, setSections] = useState(
    initialSections.length > 0
      ? initialSections.map((s) => ({ ...s, open: false }))
      : [{ title: '', content: '', tags: '', open: readOnly ? false : true }], // Start with one section closed if no initialSections
  );
   useEffect(() => {
    if (onChange) onChange(sections);
  }, [sections]);
 useEffect(() => {
    if (initialSections.length > 0) {
      
      setSections(initialSections.map((s) => ({
         ...s, open: true // Start with sections closed
         
         })
        ));
    }
  }, [initialSections]);
  const handleAddSection = (e:any) => {
    e.preventDefault();
    setSections([...sections, { title: '', content: '', tags: '', open: true }]);
  };

  const handleRemoveSection = (index:any) => {
    const updated = sections.filter((_, i) => i !== index);
    setSections(updated);
  };

  const handleChange = (index:any, field:any, value:any) => {
    const updated = [...sections];
    updated[index][field] = value;
    setSections(updated);
  };

  const toggleSection = (index:any) => {
    const updated = [...sections];
    updated[index].open = !updated[index].open;
    setSections(updated);
  };


  return (
    <>
    {!readOnly && (
    <div className="mt-[-31px] mb-2 justify-end flex">
      <button
        onClick={(e) => handleAddSection(e)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        + Add Section
      </button>
    </div>
    )}
    <div className="my-4">
      {sections.map((section, index) => (
        <div key={index} className="border rounded shadow">
          {/* Accordion Header using Title */}
          <div
            onClick={() => toggleSection(index)}
            className="cursor-pointer bg-gray-100 px-4 py-3 font-semibold text-lg flex justify-between items-center"
          >
            <span>
              {section.title.trim()
                ? section.title
                : `Untitled Section ${index + 1}`}
            </span>
            <span>{section.open ? '▲' : '▼'}</span>
          </div>

          {/* Accordion Content */}
          {section.open && (
            <div className="p-4 space-y-4 bg-white">
              <input
                type="text"
                placeholder="Enter title here"
                value={section.title}
                onChange={(e) => handleChange(index, 'title', e.target.value)}
                className="w-full border border-gray-300 p-3 text-xl"
                readOnly={readOnly}
              />
               <RichEditor content={section.content} onChange={(html:any) => handleChange(index, 'content', html)} readOnly={readOnly} />
              {/* <textarea
                rows="5"
                placeholder="Start writing your content..."
                value={section.content}
                onChange={(e) =>
                  handleChange(index, 'content', e.target.value)
                }
                className="w-full border border-gray-300 p-3"
              ></textarea> */}

              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <label className="font-semibold">Tags</label>
                  <input
                    type="text"
                    placeholder="Add tags"
                    value={section.tags}
                    onChange={(e) =>
                      handleChange(index, 'tags', e.target.value)
                    }
                    readOnly={readOnly}
                    className="w-full border border-gray-300 p-2 mt-1"
                  />
                </div>
              </div>
{ !readOnly && (
              <div className="text-right">
                <button
                  onClick={() => handleRemoveSection(index)}
                  className="text-red-600 hover:underline mt-4"
                  disabled={sections.length === 1}
                >
                  Remove Section
                </button>
              </div>
)}
            </div>
          )}
        </div>
      ))}
    </div>
    </>
  );
};

export default DynamicPostSections;
