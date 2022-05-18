import { useEditor } from "@appquality/craft-blocks";
import React from "react";
import {
  BSGrid,
  BSCol,
  Title,
  Card,
  Button as AppqButton,
} from "@appquality/appquality-design-system";

import {
  Button,
  ButtonContainer,
  Text,
  Wysiwyg,
  Picture,
} from "@appquality/craft-blocks";

export const Toolbox = () => {
  const { connectors } = useEditor();

  return (
    <Card>
      <BSGrid>
        <BSCol size="col-12 aq-mb-2">
          <Title size="sm">Drag to add</Title>
        </BSCol>
        <BSCol size="col-12 aq-mb-2">
          <span
            ref={(ref) => connectors.create(ref, <Button text="Click me" />)}
          >
            <AppqButton size="block" flat={true} type="info">
              Button
            </AppqButton>
          </span>
        </BSCol>
        <BSCol size="col-12 aq-mb-2">
          <span ref={(ref) => connectors.create(ref, <Text text="Hi world" />)}>
            <AppqButton size="block" flat={true} type="info">
              Text
            </AppqButton>
          </span>
        </BSCol>
        <BSCol size="col-12 aq-mb-2">
          <span ref={(ref) => connectors.create(ref, <Wysiwyg />)}>
            <AppqButton size="block" flat={true} type="info">
              Rich Text
            </AppqButton>
          </span>
        </BSCol>
        <BSCol size="col-12 aq-mb-2">
          <span ref={(ref) => connectors.create(ref, <Picture />)}>
            <AppqButton size="block" flat type="info">
              Picture
            </AppqButton>
          </span>
        </BSCol>
        <BSCol size="col-12 aq-mb-2">
          <span
            ref={(ref) =>
              connectors.create(
                ref,
                <ButtonContainer positions="space-around">
                  <Button text="Contained button 1" />
                  <Button text="Contained button 2" />
                </ButtonContainer>
              )
            }
          >
            <AppqButton size="block" flat={true} type="info">
              Button Container
            </AppqButton>
          </span>
        </BSCol>
      </BSGrid>
    </Card>
  );
};
