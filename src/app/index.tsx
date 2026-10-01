import NoteCard from "@/components/NoteCard"
import { useNotesStore } from "@/store/useNotes"
import { CATEGORY } from "@/utils/constants"
import {AntDesign} from "@expo/vector-icons"
import { useMemo, useState } from "react"


import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native"


const HomeScreen=()=>{
  const router=useRouter();
  const [searchText, setSearchText] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const {notes}= useNotesStore();
 const filteredNotes = useMemo(() => {
  let result = notes;

  if (selectedCategory) {
    result = result.filter((note) => note.category === selectedCategory);
  }
  if (searchText.trim()) {
    result = result.filter((note) =>
      note.title.toLowerCase().includes(searchText.toLowerCase()),
    );
  }
  return result;
},[notes, selectedCategory, searchText]);


  const handleCategoryClick =(category:string)=>{
    //setSelectedCategory(category)
    setSelectedCategory((prev)=> prev=== category ? "" : category)
  }
  return (
    <SafeAreaView className="flex-1 p-4 bg-alabaster">
      <View className="flex-1 ">
        <TextInput
          className="bg-white border border-gray-300 h-4 rounded-full p-4 w-full"
          placeholder="Search your thoughts..."
          placeholderTextColor="#393E46"
          value={searchText}
          onChangeText={setSearchText}
        />

        <ScrollView horizontal
        showsHorizontalScrollIndicator={false} 
        style={{minHeight: 50,maxHeight: 50, marginTop: 16}} 
        contentContainerStyle={{
          flexDirection:"row", 
          alignItems:"center",
          gap:8,
        paddingHorizontal: 4,
      }}
        >
          {CATEGORY.map((item) => {
            const isSelected = selectedCategory === item

            return (
              <Pressable
                key={item}
                onPress={() => handleCategoryClick(item)}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 28,
                  borderRadius: 999,
                  backgroundColor: isSelected ? "#00ADB5" : "#fff",
                  borderWidth: 1,
                  borderColor: isSelected ? "#3830a3" : "#d1d5db",
                }}
              >
                <Text style={{ color:isSelected ? "#fff" : "#4b5563", fontSize:14,}}>{item}</Text>
              </Pressable>
            )
          })}
        </ScrollView>
        {filteredNotes.length === 0 ?   (
          <View className="w-full items-center mt-16 justify-center">
            <Text className="text-gray-400 font-medium text-2xl">No notes yet</Text>
            <Text className="text-gray-500 text-lg mt-2">
              Tap + to capture your first thought
              </Text>
          </View>
        ) : (
          <FlatList data={filteredNotes} 
        keyExtractor={(note)=>note.id}
        renderItem={({item}) => <NoteCard note={item} />}
        contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}
        />
        ) }
       
        <Pressable 
        onPress={()=>router.push("/add" as any)}
        className="absolute bottom-4 right-5 bg-governor-bay p-5 rounded-3xl shadow-2xl">
          <AntDesign name="plus" size={30} color="white"/> 
        </Pressable>
        
      </View>
    </SafeAreaView>
  )
}
export default HomeScreen