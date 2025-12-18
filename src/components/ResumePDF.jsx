import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Link } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 40,
        fontFamily: 'Helvetica',
    },
    header: {
        marginBottom: 20,
        borderBottom: 1,
        borderBottomColor: '#CCCCCC',
        paddingBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#2563EB', // Blue-600
    },
    title: {
        fontSize: 14,
        color: '#4B5563', // Gray-600
        marginBottom: 10,
    },
    contactInfo: {
        flexDirection: 'row',
        fontSize: 10,
        color: '#6B7280', // Gray-500
        gap: 15,
        marginBottom: 5,
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937', // Gray-800
        marginBottom: 8,
        textTransform: 'uppercase',
        borderBottom: 1,
        borderBottomColor: '#E5E7EB', // Gray-200
        paddingBottom: 2,
    },
    paragraph: {
        fontSize: 10,
        lineHeight: 1.5,
        color: '#374151', // Gray-700
        marginBottom: 5,
        textAlign: 'justify',
    },
    skillBadge: {
        padding: "3 8",
        backgroundColor: '#F3F4F6', // Gray-100
        borderRadius: 4,
        fontSize: 9,
        marginRight: 5,
        marginBottom: 5,
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    projectTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#111827', // Gray-900
    },
    projectLink: {
        fontSize: 9,
        color: '#2563EB',
        textDecoration: 'none',
        marginLeft: 5,
    },
    experienceItem: {
        marginBottom: 10,
    },
    date: {
        fontSize: 9,
        color: '#6B7280',
        fontStyle: 'italic',
        marginBottom: 2,
    },
});

// Create Document Component
export const ResumePDF = ({ about, experience, skills, projects }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.name}>{about.name}</Text>
                <Text style={styles.title}>{about.title}</Text>
                <View style={styles.contactInfo}>
                    {about.email && <Text>Email: {about.email}</Text>}
                    {about.phone && <Text>Phone: {about.phone}</Text>}
                    {about.location && <Text>Location: {about.location}</Text>}
                </View>
                <View style={styles.contactInfo}>
                    {about.linkedin && <Link src={about.linkedin}>LinkedIn</Link>}
                    {about.github && <Link src={about.github}>GitHub</Link>}
                    {about.twitter && <Link src={about.twitter}>Portfolio</Link>}
                </View>
            </View>

            {/* Profile / Bio */}
            {about.bio && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Profile</Text>
                    <Text style={styles.paragraph}>{about.bio}</Text>
                </View>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Skills</Text>
                    <View style={styles.skillsContainer}>
                        {skills.map((skill, index) => (
                            <Text key={index} style={styles.skillBadge}>{skill.name}</Text>
                        ))}
                    </View>
                </View>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Experience</Text>
                    {experience.map((exp, index) => (
                        <View key={index} style={styles.experienceItem}>
                            <Text style={styles.projectTitle}>{exp.position} @ {exp.company}</Text>
                            <Text style={styles.date}>{exp.period}</Text>
                            <Text style={styles.paragraph}>{exp.description}</Text>
                        </View>
                    ))}
                </View>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Projects</Text>
                    {projects.map((proj, index) => (
                        <View key={index} style={styles.experienceItem}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                                <Text style={styles.projectTitle}>{proj.title}</Text>
                                {proj.link && <Link style={styles.projectLink} src={proj.link}>View Project</Link>}
                            </View>
                            <Text style={styles.paragraph}>{proj.description}</Text>
                            {/* Project Tags */}
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 2 }}>
                                {proj.tags && proj.tags.map((tag, i) => (
                                    <Text key={i} style={{ fontSize: 8, color: '#6B7280', marginRight: 4, backgroundColor: '#F3F4F6', padding: '1 4', borderRadius: 2 }}>{tag}</Text>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>
            )}
        </Page>
    </Document>
);
