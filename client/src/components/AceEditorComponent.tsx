import React from 'react'
import AceEditor, { IAceEditorProps } from 'react-ace'

import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/mode-typescript'
import 'ace-builds/src-noconflict/theme-monokai'

// React.lazy(() => import('ace-builds/src-noconflict/ext-language_tools'))
// React.lazy(() => import('ace-builds/src-noconflict/mode-typescript'))
// React.lazy(() => import('ace-builds/src-noconflict/theme-monokai'))

interface AceEditorComponentProps extends IAceEditorProps {
  className?: string
}

const AceEditorComponent = (props: AceEditorComponentProps) => {
  return <AceEditor {...props} />
}

export default AceEditorComponent
