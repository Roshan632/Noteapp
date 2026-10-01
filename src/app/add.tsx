import { View, Text, Pressable, TextInput, ScrollView, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter} from 'expo-router'
import { Feather, FontAwesome6 } from '@expo/vector-icons'
import { CATEGORY } from '@/utils/constants'
import { useNotesStore } from '@/store/useNotes'
import * as Crypto from 'expo-crypto'

const add = () => {
  const router = useRouter();
  const {addNote} = useNotesStore();
 const [title, setTitle] = React.useState("");
 const [description, setDescription] = React.useState("");
 const [date, setDate] = React.useState("");
 const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
 
 const handleAddNote = () => {
    addNote({
        id: Crypto.randomUUID(),
        title,
        description,
        category:selectedCategory,
        date,
        isCompleted:false,
    });
    Alert.alert("Success", "Notes Added successfully",[
        {text:"Done", style:"cancel", onPress:()=>router.back()},
    ]);
}
    
 return (
   <SafeAreaView className="flex-1 p-4 bg-alabaster">
   <Pressable onPress={()=>router.back()}>
    <FontAwesome6 className="chevron-left" size={24} color="black"/>
</Pressable>

<TextInput placeholder='Note Title'
value={title}
onChangeText={setTitle}
placeholderTextColor="#3830a35e"
className="text-4xl font-semibold mt-4"
/>

<TextInput placeholder='Note Description'
value={description}
onChangeText={setDescription}
placeholderTextColor="#3830a359"
className="text-2xl font-semibold mt-6"
/>
<View className="relative mt-64">
    <TextInput placeholder="Date" value={date}
    onChangeText={setDate}
    textAlignVertical="center"
    className="rounded-3xl h-14 pl-11 text-xl bg-white shadow"
    placeholderTextColor="#3830a35e"
    />
    <Feather name="calendar" size={16}
      className="text-governor-bay absolute top-[1.4rem] left-4"
      />
</View>
<View className="bg-white shadow mt-8 rounded-xl p-5">
    <Text className="text-gray-400 font-semibold">CATEGORY</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} >
        <View className="flex-row gap-2 mt-4 flex-wrap">
            {CATEGORY.map((category)=>{
                const bgClass=
                selectedCategory === category ? "bg-governor-bay" : "";
                const textClass=
                 selectedCategory === category ? "text-white" : "text-gray-600";


return (
    <Pressable
     key={category}
     className={`border border-gray-300 rounded-full px-8 py-3 ${bgClass}`}
     onPress={()=>setSelectedCategory(category)} >

        <Text className={`text-gray-600 ${textClass}`}>
            {category}</Text>
    </Pressable>
);
            }
            )}
        </View>
    </ScrollView>
</View>
<Pressable className="bg-governor-bay w-full h-16 rounded-2xl mt-16 flex items-center justify-center"
onPress={()=>handleAddNote()}>
    <Text className="text-white text-xl font-medium">Add Note</Text>

</Pressable>

   </SafeAreaView>
  )
}

export default add