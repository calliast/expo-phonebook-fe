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
      <View style={styles.TableHead}>
        <Text style={styles.TableColumnNo}>#</Text>
        <Text style={styles.TableColumnText}>Name</Text>
        <Text style={styles.TableColumnText}>Phone</Text>
        <Text style={styles.TableColumnText}>Action</Text>
      </View>
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
        style={{ maxHeight: 300 }}
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
    height: 270,
    backgroundColor: "#FFF",
    flexDirection: "column",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 5,
  },
  TableHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
  TableColumnText: {
    width: "30%",
    justifyContent: "space-between",
    textAlign: "center",
    fontSize: 16,
  },
  TableColumnNo: {
    width: 35,
    textAlign: "center",
  },
  ItemList: {
    marginTop: 10,
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
