import UserItem from "./UserItem";
import { useDispatch, useSelector } from "react-redux";
import { loadContact, loadMore, deleteContact } from "../features/contactSlice";
import { useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";

export default function UserList(props) {
  const contacts = useSelector((state) => state.contact.contacts);
  const info = useSelector((state) => state.contact.info);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadContact());
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(loadMore());
  };

  return (
    <SafeAreaView style={styles.TableList}>
      <FlatList
        data={contacts}
        renderItem={({ item, index }) => (
          <UserItem
            no={index + 1}
            key={item.id}
            itemId={item.id}
            name={item.name}
            phone={item.phone}
            sent={item.sent}
            delete={() => dispatch(deleteContact({ id: item.id }))}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.ItemList}
        style={{ maxHeight: 450 }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
      <View style={styles.totalContact}>
        <Text>
          There{" "}
          {info.result > 1
            ? `are ${info.result} contacts`
            : `is only ${info.result} contact`}
          {info.name || info.phone ? ` found.` : "."}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  TableList: {
    height: 430,
    backgroundColor: "#FFF",
    flexDirection: "column",
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  ItemList: {
    marginVertical: 5,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  totalContact: {
    justifyContent: "flex-end",
    flexDirection: "row",
    width: "100%",
    marginTop: 10
  },
});
