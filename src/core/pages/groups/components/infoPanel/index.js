import React from 'react'

import {
    InfoPanelWrapper,
    InfoPanelContainer,
    CloseButtonPanel,
    Cross,
    Content,
    Title,
    Body,
    TextBlock,
    AcceptButtonBlock,
    AcceptButton,
}        from '../../../../modules/components/InfoPanelComponents/styledComponents'
import e from "../../../../../langs";

export default class InfoPanel extends React.Component {
    constructor(props) {
        super(props)
        e.setLanguage(props.language)
    }

    state = {
        isOpen: false
    }

    componentWillReceiveProps(props) {
        this.setState({isOpen: props.isOpen})
        e.setLanguage(props.language);
    }

    closeInfoPanel = () => {
        const {onCloseHandler} = this.props;
        typeof onCloseHandler === 'function' && onCloseHandler();
    }

    onCloseCalback = () => {
        const {isOpen} = this.state;
        const {onCloseCallback} = this.props;
        if (!isOpen) {
            typeof onCloseCallback === 'function' && onCloseCallback();
        }
    }

    acceptButtonClickHandler = () => {
        if (typeof this.props.onOkButtonClick === 'function') {
            this.props.onOkButtonClick();
            this.closeInfoPanel();
        } else {
            this.closeInfoPanel();
        }
    }

    render() {
        const {isOpen} = this.state;
        const {component, title, infoNumber = 0, children, titleStyle, noTitlePicture, noInfoBlock} = this.props;
        return (
            <InfoPanelWrapper
                onTransitionEnd={this.onCloseCalback}
                className={isOpen ? 'open' : 'close'}
            >
                <InfoPanelContainer
                    className={isOpen ? 'open' : 'close'}
                >
                    <CloseButtonPanel
                        onClick={this.closeInfoPanel}
                    >
                        <Cross />
                    </CloseButtonPanel>
                    <Content>
                        <Title
                            style={titleStyle}
                            noTitlePicture={noTitlePicture}
                            infoNumber={infoNumber}
                        >
                            {title}
                        </Title>
                        <Body>
                            {
                                noInfoBlock ?
                                    component || children
                                    :
                                    <TextBlock>
                                        {component || children}
                                    </TextBlock>
                            }
                        </Body>
                        <AcceptButtonBlock>
                            <AcceptButton
                                onClick={this.acceptButtonClickHandler}
                            />
                        </AcceptButtonBlock>
                    </Content>
                </InfoPanelContainer>
            </InfoPanelWrapper>
        )
    }
}