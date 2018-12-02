import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';

export default class TextPanel extends Component {
  constructor(props) {
    super(props);
    const panelText = props.panelText;
    this.state = {
      title: panelText.title,
      subtitle: panelText.subtitle,
      introduction: panelText.introduction,
      paragraphs: panelText.paragraphs,
      renderedSections: [],
      index: 1,
      loadMore: true,
      hasFinished: false,
    };
    this._renderFields = this._renderFields.bind(this);
    this._loadMore = this._loadMore.bind(this);
  }

  _renderFields(elem) {
    const paragraphs = this.state.paragraphs;
    const fields = [];
    let index = elem ? elem : 1;

    if (!!paragraphs) {
      for (let i = 0; i <= index; i++) {
        fields.push(
            <Text key={ 'p_' + i }>
              <Text style={[styles.text, { padding: 5, fontWeight: 'bold' }]}>{paragraphs[i].title}</Text>
              <Text>{'\n'}</Text>
              <Text style={styles.text}>{paragraphs[i].text}</Text>
              <Text>{'\n'}</Text>
            </Text>
        );
      }
    }

    this.setState({ renderedSections: [...fields] });
  }

  _loadMore() {
    if (this.state.index < this.state.paragraphs.length) {
      this.setState({ index: this.state.index + 1 });
      return this._renderFields(this.state.index);
    } else {
      this.setState({ hasFinished: true });
    }
  }

  componentWillMount() {
    this._renderFields();
  }

  render() {
    return (
      <View>
        <Text style={styles.header}>
          { this.state.title ? this.state.title : '' }
        </Text>
        <Text style={styles.header}>
          { this.state.subtitle ? this.state.subtitle : '' }
        </Text>
        <Text style={styles.intro}>
          { this.state.introduction ? this.state.introduction : '' }
        </Text>
        {this.state.renderedSections}
        <TouchableOpacity
          disabled={this.state.hasFinished}
          onPress={this._loadMore}>
            <Text style={styles.loadMore}>...</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    alignSelf: 'center',
    color: '#0C7EE3',
    fontSize: 16,
  },
  intro: {
    textAlign: 'left',
    alignSelf: 'center',
    color: '#978AA7',
    fontSize: 14,
  },
  text: {
    textAlign: 'left',
    fontSize: 12,
    color: '#978AA7',
  },
  loadMore: {
    color: '#978AA7',
    padding: 10,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 32,
  },
});
