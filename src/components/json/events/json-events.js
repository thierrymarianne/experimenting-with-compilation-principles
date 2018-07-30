const events = {
  node: {
    destroyed: 'node.destroyed',
    hidden: 'node.hidden',
    madeEditable: 'node.made_editable',
    afterBeingMadeEditable: 'node.after_being_made_editable',
    madeNonEditable: 'node.made_non_editable',
    afterBeingMadeNonEditable: 'node.after_being_made_non_editable',
    registered: 'node.registered',
    shown: 'node.shown',
  },
  pair: {
    added: 'pair.added',
  },
};

export default events;
