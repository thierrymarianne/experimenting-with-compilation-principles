const events = {
  node: {
    altered: 'node.altered',
    afterAlteration: 'node.after_alteration',
    destroyed: 'node.destroyed',
    hidden: 'node.hidden',
    madeEditable: 'node.made_editable',
    afterBeingMadeEditable: 'node.after_being_made_editable',
    madeNonEditable: 'node.made_non_editable',
    afterEdition: 'node.after_edition',
    registered: 'node.registered',
    afterRegistration: 'node.after_registration',
    shown: 'node.shown',
  },
  pair: {
    added: 'pair.added',
  },
};

export default events;
