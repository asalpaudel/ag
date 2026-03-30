import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.header}>My Profile</Text>

                <View style={styles.card}>
                    <Text style={styles.name}>Demo Player</Text>
                    <Text style={styles.sub}>player@example.com</Text>
                </View>

                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>My Game Credentials</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Order History</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.menuItem, { marginTop: 40 }]}>
                    <Text style={[styles.menuText, { color: '#ef4444' }]}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    content: { padding: 24, paddingTop: 40 },
    header: { fontSize: 24, fontWeight: '700', color: '#1e293b', marginBottom: 24 },
    card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, marginBottom: 30 },
    name: { fontSize: 20, fontWeight: 'bold', color: '#0f172a' },
    sub: { fontSize: 14, color: '#64748b', marginTop: 4 },
    menuItem: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0' },
    menuText: { fontSize: 16, fontWeight: '500', color: '#334155' }
});
