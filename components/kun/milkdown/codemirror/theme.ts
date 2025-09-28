import { EditorView } from '@codemirror/view'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'
import type { Extension } from '@codemirror/state'

const colors = {
  primary: 'var(--color-primary)',
  selected: 'color-mix(in oklab,var(--color-primary)10%,transparent)',
  primaryLight: 'var(--color-primary-400)',
  primaryDark: 'var(--color-primary-600)',
  secondary: 'var(--color-secondary)',
  secondaryLight: 'var(--color-secondary-400)',
  success: 'var(--color-success)',
  successLight: 'var(--color-success-400)',
  warning: 'var(--color-warning)',
  warningLight: 'var(--color-warning-400)',
  danger: 'var(--color-danger)',
  dangerLight: 'var(--color-danger-400)',
  foreground: 'var(--color-foreground)',
  background: 'var(--color-background)',
  backgroundAlpha: 'var(--color-background) / 0.7',
  overlay: 'var(--color-default-200)',
  overlayLight: 'var(--color-default-100)',
  divider: 'var(--color-default-100)',
  content1: 'var(--color-content1)',
  content2: 'var(--color-content2)',
  content3: 'var(--color-content3)',
  content4: 'var(--color-content4)'
}

export const kunCMTheme = () => {
  return EditorView.theme({
    '&': {
      backgroundColor: colors.backgroundAlpha,
      borderRadius: '0.75rem',
      lineHeight: '1.5',
      scrollbarWidth: 'none',
      minHeight: '300px'
    },

    '&.cm-focused': {
      outline: 'none'
    },

    '.cm-scroller': {
      lineHeight: '1.5',
      maxWidth: '100%',
      scrollbarWidth: 'none'
    },

    '.cm-content': {
      padding: '1rem 0.5rem',
      maxWidth: '100%'
    },

    '.cm-line': {
      padding: '0.2rem 0',
      borderRadius: '0.375rem',
      maxWidth: '100%',
      fontSize: '1rem',
      '&:hover': {
        backgroundColor: colors.overlayLight
      }
    },

    '&.cm-focused .cm-cursor': {
      borderLeftColor: colors.primary,
      borderLeftWidth: '2px'
    },

    '.cm-panels': {
      backgroundColor: colors.background,
      color: colors.foreground,
      borderRadius: '0.5rem',
      margin: '0.5rem'
    },
    '.cm-panels.cm-panels-top': {
      borderBottom: `1px solid ${colors.divider}`
    },
    '.cm-panels.cm-panels-bottom': {
      borderTop: `1px solid ${colors.divider}`
    },

    '.cm-searchMatch': {
      backgroundColor: `${colors.primaryLight}50`,
      outline: `1px solid ${colors.primaryLight}`,
      borderRadius: '2px'
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: `${colors.primary}40`
    },

    '.cm-activeLine': {
      backgroundColor: `${colors.content1}30`,
      borderRadius: '0.375rem'
    },
    '.cm-selectionMatch': {
      backgroundColor: `${colors.primary}20`,
      borderRadius: '2px'
    },

    '.cm-matchingBracket, .cm-nonmatchingBracket': {
      backgroundColor: `${colors.warning}30`,
      outline: 'none',
      borderRadius: '2px',
      padding: '0 1px',
      fontWeight: '600'
    },

    '.cm-gutters': {
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '0',
      fontSize: '1rem',
      padding: '0'
    },

    '.cm-lineNumbers': {
      color: colors.content3
    },

    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      {
        backgroundColor: colors.selected
      },

    '.cm-activeLineGutter': {
      backgroundColor: colors.selected
    },

    '.cm-foldGutter': {
      color: colors.content3
    },

    '.cm-tooltip': {
      backgroundColor: colors.background,
      border: `1px solid ${colors.divider}`,
      borderRadius: '0.5rem',
      boxShadow:
        '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      overflow: 'hidden'
    },

    '.cm-tooltip-autocomplete': {
      '& > ul': {
        fontSize: '0.9rem',
        maxHeight: '20rem'
      },
      '& > ul > li': {
        padding: '0.375rem 0.75rem',
        borderRadius: '0.25rem'
      },
      '& > ul > li[aria-selected]': {
        backgroundColor: colors.content1,
        color: colors.foreground
      }
    },

    '&::-webkit-scrollbar': {
      width: '6px',
      height: '6px'
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: colors.content3,
      borderRadius: '3px',
      '&:hover': {
        backgroundColor: colors.content2
      }
    }
  })
}

export const kunCMHighlightStyle = () =>
  HighlightStyle.define([
    // Keywords and control flow
    { tag: t.keyword, color: colors.primary, fontWeight: '600' },
    { tag: t.controlKeyword, color: colors.primary, fontWeight: '600' },
    { tag: t.moduleKeyword, color: colors.primary, fontWeight: '600' },

    // Variables and properties
    { tag: [t.propertyName, t.macroName], color: colors.secondary },
    { tag: t.variableName, color: colors.foreground },
    {
      tag: t.definition(t.variableName),
      color: colors.secondary,
      fontWeight: '600'
    },

    // Functions
    {
      tag: [t.function(t.variableName), t.labelName],
      color: colors.success,
      fontWeight: '500'
    },
    {
      tag: t.definition(t.function(t.variableName)),
      color: colors.success,
      fontWeight: '600'
    },

    // Types and classes
    {
      tag: [t.typeName, t.className, t.namespace],
      color: colors.warning,
      fontWeight: '500'
    },
    { tag: [t.annotation, t.modifier], color: colors.warningLight },

    // Constants and literals
    {
      tag: [t.number, t.bool, t.null],
      color: colors.secondary,
      fontWeight: '500'
    },
    { tag: t.string, color: colors.success },
    { tag: t.regexp, color: colors.warning },

    // Special syntax
    { tag: [t.meta, t.comment], color: colors.foreground, fontStyle: 'italic' },
    { tag: t.tagName, color: colors.primary, fontWeight: '500' },
    { tag: t.attributeName, color: colors.warning },

    // Markdown specific
    { tag: t.heading, color: colors.primary, fontWeight: '700' },
    {
      tag: [t.url, t.link],
      color: colors.success,
      textDecoration: 'underline'
    },
    { tag: t.emphasis, fontStyle: 'italic' },
    { tag: t.strong, fontWeight: '700' },

    // Special cases
    {
      tag: t.invalid,
      color: colors.danger,
      borderBottom: `2px dotted ${colors.danger}`
    },
    { tag: t.changed, color: colors.warning },
    { tag: t.inserted, color: colors.success },
    { tag: t.deleted, color: colors.danger }
  ])

export const kunCM = (): Extension => [
  kunCMTheme(),
  syntaxHighlighting(kunCMHighlightStyle())
]
