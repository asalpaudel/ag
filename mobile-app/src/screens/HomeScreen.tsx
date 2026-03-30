import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.header}>
                    <Text style={styles.title}>Welcome to TopUp!</Text>
                </View>

                <View style={styles.promoCard}>
                    <Text style={styles.promoTitle}>10% Bonus on Crypto Deposits</Text>
                    <Text style={styles.promoBody}>Use your crypto wallet to get instant rewards...</Text>
                </View>

                <View style={styles.promoCardAlt}>
                    <Text style={styles.promoTitleAlt}>New Game Available: Golden Ace</Text>
                    <Text style={styles.promoBodyAlt}>Ask your agent to create credentials.</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    scroll: { padding: 20 },
    header: { marginBottom: 30, marginTop: 20 },
    title: { fontSize: 28, fontWeight: '800', color: '#1e3a8a' },
    promoCard: { backgroundColor: '#2563eb', padding: 20, borderRadius: 12, marginBottom: 15 },
    promoTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
    promoBody: { color: '#bfdbfe', fontSize: 14 },
    promoCardAlt: { backgroundColor: '#fff', padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0' },
    promoTitleAlt: { color: '#0f172a', fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
    promoBodyAlt: { color: '#64748b', fontSize: 14 }
});
