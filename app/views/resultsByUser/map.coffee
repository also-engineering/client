( doc ) ->

  return unless doc.collection is 'result' or doc.workflowId?
    emit doc.enumerator, doc.tripId