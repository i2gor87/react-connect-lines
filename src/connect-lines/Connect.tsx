import React, {cloneElement, useCallback, useEffect, useMemo} from 'react'
import {ConnectElement, useConnectElements} from './elements'

interface ConnectProps extends Omit<ConnectElement, 'element'> {
  children: React.ReactElement
}

export function Connect(props: ConnectProps) {
  const {children, id} = props
  const {addElement, removeElement} = useConnectElements()

  const add = useCallback(
    (node) => {
      addElement({
        ...props,
        element: node,
      })
    },
    [addElement, props]
  )

  const clone = useMemo(
    () =>
      cloneElement(props.children, {
        ...props.children.props,
        ref: (node: any) => {
          const _ref = (children as any).ref

          add(node)

          if (typeof _ref === 'function') {
            _ref(node)
          }
        },
      }),
    [add, children, props.children]
  )

  useEffect(() => {
    return () => {
      removeElement(id)
    }
  }, [id, removeElement])

  return clone
}
