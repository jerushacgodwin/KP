function extractAndMergeNestedData(data, fieldsToExtract) {
  const mergedData = { ...data };

  fieldsToExtract.forEach(({ path, targetField, nestedFields }) => {
    let nestedData = path.reduce(
      (obj, key) => (obj && obj[key] ? obj[key] : null),
      data
    );

    if (nestedData) {
      if (Array.isArray(nestedData) && nestedData.length > 0) {
        nestedData = nestedData[0];
      }

      nestedFields.forEach((field) => {
        mergedData[`${targetField}_${field}`] = nestedData[field] || null;
      });

      delete mergedData[path[0]];
    }
  });

  return mergedData;
}

module.exports = { extractAndMergeNestedData };
