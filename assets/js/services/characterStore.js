const KEYS = {
  custom: 'custom_characters',
  deleted: 'deleted_ids',
  edited: 'edited_characters'
};
export function getDeletedIds(){
    return JSON.parse(localStorage.getItem(KEYS.deleted) || '[]');
}
export function deleteCharacter(id){
    const ids = getDeletedIds();
    localStorage.setItem(KEYS.deleted, JSON.stringify([...ids, id]));
}

export function getCustomCharacters(){
    return JSON.parse(localStorage.getItem(KEYS.custom)||'[]');

}

export function saveCustomCharacter(character) {
    const all = getCustomCharacters();
    const newChar = {
        ...character,
        id: 'local_' + Date.now(),
        isLocal: true
    };
    localStorage.setItem(KEYS.custom, JSON.stringify([...all, newChar]));
    return newChar;
}

export function deleteCustomCharacter(id){
    const all = getCustomCharacters().filter(c => c.id !== id);
    localStorage.setItem(KEYS.custom, JSON.stringify(all));
}

export function getEditedCharacters(){
    return JSON.parse(localStorage.getItem(KEYS.edited) || '{}');
}

export function saveEdit(id, fields){
    const edits = getEditedCharacters();
    edits[id]= {...edits[id], ...fields };
    localStorage.setItem(KEYS.edited, JSON.stringify(edits));
}

export function mergeCharacters(apiCharacters){
    const deletedIds = getDeletedIds();   
    const edits   = getEditedCharacters(); 
    const customs = getCustomCharacters();

    const fromApi = apiCharacters
        .filter(c => !deletedIds.includes(c.id))
        .map(c => edits[c.id] ? { ...c, ...edits[c.id] } : c);
    return [...fromApi, ...customs];
}
