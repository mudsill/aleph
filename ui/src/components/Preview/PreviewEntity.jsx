import React from 'react';
import { connect } from 'react-redux';

import { selectEntity } from 'src/selectors';
import Preview from 'src/components/Preview/Preview';
import EntityContextLoader from 'src/components/Entity/EntityContextLoader';
import EntityInfoMode from 'src/components/Entity/EntityInfoMode';
import EntityTagsMode from 'src/components/Entity/EntityTagsMode';
import EntitySimilarMode from 'src/components/Entity/EntitySimilarMode';
import EntityToolbar from 'src/components/Entity/EntityToolbar';
import { DualPane, SectionLoading, ErrorSection } from 'src/components/common';
import EntityViewsMenu from "src/components/ViewsMenu/EntityViewsMenu";


class PreviewEntity extends React.Component {
  render() {
    const { entity, entityId, previewMode = 'view' } = this.props;
    let mode = null, maximised = false;
    if (entity.isError) {
      return <ErrorSection error={entity.error} />
    } else if (entity.id === undefined) {
      return <SectionLoading/>;
    } else if (previewMode === 'info') {
      mode = <EntityInfoMode entity={entity} />;
    } else if (previewMode === 'tags') {
      mode = <EntityTagsMode entity={entity} />;
    } else if (previewMode === 'similar') {
      mode = <EntitySimilarMode entity={entity} />;
      maximised = true;
    } else {
      mode = <EntityInfoMode entity={entity} />;
      maximised = true;
    }
    return (
      <EntityContextLoader entityId={entityId}>
        <Preview maximised={maximised}>
          <EntityViewsMenu entity={entity}
                           activeMode={previewMode}
                           isPreview={true} />
          <DualPane.InfoPane className="with-heading">
            <EntityToolbar entity={entity} isPreview={true} />
            {mode}
          </DualPane.InfoPane>
        </Preview>
      </EntityContextLoader>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { previewId } = ownProps;
  return {
    entity: selectEntity(state, previewId)
  };
};

PreviewEntity = connect(mapStateToProps, {})(PreviewEntity);
export default PreviewEntity;