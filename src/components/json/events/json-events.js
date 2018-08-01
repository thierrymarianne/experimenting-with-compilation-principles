const events = {
  node: {
    afterAlteration: 'node.after_alteration',
    afterBeingHidden: 'node.after_being_hidden',
    afterBeingMadeEditable: 'node.after_being_made_editable',
    afterBeingShown: 'node.after_being_shown',
    afterEdition: 'node.after_edition',
    afterRegistration: 'node.after_registration',
    altered: 'node.altered',
    destroyed: 'node.destroyed',
    hidden: 'node.hidden',
    madeEditable: 'node.made_editable',
    madeNonEditable: 'node.made_non_editable',
    registered: 'node.registered',
    shown: 'node.shown',
    unregistered: 'node.unregistered',
  },
  pair: {
    added: 'pair.added',
  },
};

export default events;
