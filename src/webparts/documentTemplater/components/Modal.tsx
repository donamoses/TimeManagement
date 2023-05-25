import * as React from 'react';
import { useId, useBoolean } from '@fluentui/react-hooks';
import {
  getTheme,
  mergeStyleSets,
  FontWeights,
  Modal,
  IIconProps,
} from '@fluentui/react';
import { DefaultButton, IconButton, IButtonStyles } from '@fluentui/react/lib/Button';
import { IDocumentModalProps } from './IModalProps';
const cancelIcon: IIconProps = { iconName: 'Cancel' };

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    width: '70%',
    overflowY: 'hidden',
    },
  iframe: {
    border: '0',
  },
  header: [
    theme.fonts.xLargePlus,
    {
      flex: '1 1 auto',
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
      padding: '12px 12px 14px 24px',
    },
  ],
  heading: {
    color: theme.palette.neutralPrimary,
    fontWeight: FontWeights.semibold,
    fontSize: 'inherit',
    margin: '0',
  },
  body: {
    flex: '4 4 auto',
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    selectors: {
      p: { margin: '14px 0' },
      'p:first-child': { marginTop: 0 },
      'p:last-child': { marginBottom: 0 },
    },
  },
});
const iconButtonStyles: Partial<IButtonStyles> = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: 'auto',
    marginTop: '4px',
    marginRight: '2px',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};

export const DocumentModal: React.FunctionComponent<IDocumentModalProps> = ({docId}:IDocumentModalProps) => {
  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
  // Use useId() to ensure that the IDs are unique on the page.
  // (It's also okay to use plain strings and manually ensure uniqueness.)
  const titleId = useId('title');
  // docId = docId;
  return (
    <div>
      <br />
      <DefaultButton onClick={showModal} text="Open Document" />
      <Modal
        titleAriaId={titleId}
        isOpen={isModalOpen}
        onDismiss={hideModal}
        isBlocking={false}
        containerClassName={contentStyles.container}
      >
        <div className={contentStyles.header}>
          <h2 className={contentStyles.heading} id={titleId}>Document Preview</h2>
          <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            ariaLabel="Close popup modal"
            onClick={hideModal}
          />
        </div>
        <div className={contentStyles.body}>
          <iframe className={contentStyles.iframe}
            src={`https://4n37nt.sharepoint.com/sites/test1512r/_layouts/15/Doc.aspx?sourcedoc={${docId}}&action=embedview`}
            width="100%"
            height="480px"
          >
          </iframe>
        </div>
      </Modal>
    </div>
  );
};

