import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import Header from "../components/Header";
import TopicSmall from "../components/TopicSmall";
import TopicSmallView from "../components/TopicSmallView";
import getRevisionDate from "../network/getRevision";
import getRevisionDateTomorrow from "../network/getRevisionDateTomorrow";
import AsyncStorage from "@react-native-community/async-storage";
import Net from "../network/Net";
import Empty from "../components/Empty"

export default function RevisionScreen() {
  const revision = getRevisionDate();
  const revisionTomorrow = getRevisionDateTomorrow();
  console.log(revision);
  console.log(revisionTomorrow);
  return (
    <View
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Header header="Revise these topics today. " />
      <View style={styles.contentWrap}>
        {revision != null ? (
          <FlatList
            keyExtractor={(revision) => revision.tid.toString()}
            data={revision}
            renderItem={({ item }) => {
              return (
                <TopicSmall
                  tid={item.tid}
                  topicName={item.topic_name}
                  subject={item.subject_name}
                />
              );
            }}
          />
        ) : <Empty text="You have nothing to revise today." />}
      </View>
      <Header header="Topics for tomorrow !!!" />
      <View style={styles.contentWrap}>
        {revisionTomorrow != null ? (
          <FlatList
            keyExtractor={(revisionTomorrow) => revisionTomorrow.tid.toString()}
            data={revisionTomorrow}
            renderItem={({ item }) => {
              return (
                <TopicSmallView
                  tid={item.tid}
                  topicName={item.topic_name}
                  subject={item.subject_name}
                />
              );
            }}
          />
        ) : <Empty text="You have nothing to revise tomorrow." />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  contentContainer: {
    paddingTop: 15,
  },
  contentWrap: {
    flex: 1,
    marginTop: 10,
  },
});
