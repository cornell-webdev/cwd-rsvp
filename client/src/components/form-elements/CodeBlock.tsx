import React, { memo, Suspense } from 'react'
import { ICodableTextareaBlock } from 'src/types/card.type'
import styled from 'styled-components'
import BlockWrapper from '../BlockWrapper'

const AceEditor = React.lazy(() => import('src/components/AceEditorComponent'))

interface CodeBlockProps {
  idx: number
  value: string
  setBlocks?: React.Dispatch<
    React.SetStateAction<ICodableTextareaBlock[] | undefined>
  >
}

const CodeBlock = ({ idx, value, setBlocks }: CodeBlockProps) => {
  const handleChange = (newValue: string) => {
    if (setBlocks) {
      setBlocks((blocks) =>
        blocks?.map((block, i) =>
          idx === i ? { type: 'CODE', value: newValue } : block
        )
      )
    }
  }

  return (
    <Suspense fallback={<div>Loading</div>}>
      <BlockWrapper idx={idx} setBlocks={setBlocks} isCodeBlock={true}>
        <Container>
          <StyledAceEditor
            mode='typescript'
            theme='monokai'
            name={`codeblock-${idx}`}
            onChange={handleChange}
            onLoad={(editor) => {
              editor.renderer.setPadding(10)
              editor.renderer.setScrollMargin(5, 10, 10, 10)
            }}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={value}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
              readOnly: !setBlocks,
            }}
            readOnly={!setBlocks}
            maxLines={Infinity}
          />
        </Container>
      </BlockWrapper>
    </Suspense>
  )
}

const Container = styled.div``

const StyledAceEditor = styled(AceEditor)`
  border-radius: 8px;
  width: 100% !important;

  & * {
    font-family: monospace !important;
    font-size: 16px !important;
    direction: ltr !important;
    text-align: left !important;
  }

  & .ace_gutter {
    width: 30px !important;
    padding: 2px 0 10px 0 !important;
  }

  & .ace_gutter-layer {
    width: 30px !important;
  }

  & .ace_gutter-cell {
    padding: 0 !important;
    text-align: center !important;
  }

  & .ace_scroller {
    left: 30px !important;
    padding: 2px 0 10px 0 !important;
  }
`

export default memo(CodeBlock)
