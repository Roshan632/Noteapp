import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { INote } from '@/types/app.types'
import { Entypo, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useNotesStore } from '@/store/useNotes'

const NoteCard = ({note}: {note: INote}) => {
  const {deleteNote,markCompleted}=useNotesStore();
  
  return (
    <View className="border border-gray-300 rounded-4xl p-8 mt-8">
      <View className="flex-grow justify-between">
        <Text
          className="text-2xl font-bold text-gray-800">
            {note.category?.toUpperCase()}
          </Text>
          {note.isCompleted ? (
            <Ionicons 
            name="checkmark-circle-sharp"
             size={28} 
             className='text-governor-bay/60'
             /> 
          ): (
          <Pressable onPress={()=>markCompleted(note.id)}>
            <Entypo name="circle" size={24} className='text-gray-400'/> 
          </Pressable>
)}
     
      </View>
      <Text className="mt-6 text-2xl">{note.title}</Text>
      <Text className="mt-6 text-gray-700 text-xl">{note.description}</Text>
      <View className="mt-8 flex-grow justify-between">
        <View className="flex-row gap-2">
          <Feather name="calendar" size={16} className="text-gray-400"/>
          <Text className="text-gray-400 font-medium">{note.date}</Text>

        </View>
        <Pressable onPress={()=>deleteNote(note.id)}>
          <MaterialIcons name="delete-outline" size={24} className="text-gray-400"/>
        </Pressable>
      </View>
    </View>
  )
}

export default NoteCard