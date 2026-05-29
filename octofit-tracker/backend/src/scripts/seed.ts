import { connectToDatabase, disconnectFromDatabase, mongoUrl } from '../lib/mongo';
import { ActivityModel } from '../models/activity';
import { LeaderboardModel } from '../models/leaderboard';
import { TeamModel } from '../models/team';
import { UserModel } from '../models/user';
import { WorkoutModel } from '../models/workout';

const users = [
    {
        username: 'maya.moves',
        displayName: 'Maya Chen',
        email: 'maya.chen@example.com',
        fitnessLevel: 'advanced',
        goals: ['hyrox', 'endurance'],
    },
    {
        username: 'leo.lifts',
        displayName: 'Leo Ramirez',
        email: 'leo.ramirez@example.com',
        fitnessLevel: 'intermediate',
        goals: ['strength', 'consistency'],
    },
    {
        username: 'nina.nova',
        displayName: 'Nina Novak',
        email: 'nina.novak@example.com',
        fitnessLevel: 'beginner',
        goals: ['mobility', 'fat-loss'],
    },
];

const teams = [
    {
        name: 'Berlin Burn',
        city: 'Berlin',
        focus: 'Endurance training',
        memberUsernames: ['maya.moves', 'nina.nova'],
    },
    {
        name: 'Hamburg Iron',
        city: 'Hamburg',
        focus: 'Strength cycles',
        memberUsernames: ['leo.lifts'],
    },
];

const activities = [
    {
        username: 'maya.moves',
        type: 'Tempo Run',
        durationMinutes: 46,
        caloriesBurned: 540,
        completedAt: new Date('2026-05-25T06:30:00Z'),
    },
    {
        username: 'leo.lifts',
        type: 'Upper Body Strength',
        durationMinutes: 58,
        caloriesBurned: 430,
        completedAt: new Date('2026-05-26T17:15:00Z'),
    },
    {
        username: 'nina.nova',
        type: 'Mobility Flow',
        durationMinutes: 32,
        caloriesBurned: 180,
        completedAt: new Date('2026-05-27T18:45:00Z'),
    },
];

const leaderboardEntries = [
    {
        username: 'maya.moves',
        teamName: 'Berlin Burn',
        score: 1480,
        rank: 1,
    },
    {
        username: 'leo.lifts',
        teamName: 'Hamburg Iron',
        score: 1310,
        rank: 2,
    },
    {
        username: 'nina.nova',
        teamName: 'Berlin Burn',
        score: 1185,
        rank: 3,
    },
];

const workouts = [
    {
        title: 'Row and Run Intervals',
        difficulty: 'advanced',
        targetMuscleGroups: ['legs', 'core', 'cardio'],
        durationMinutes: 45,
        recommendedForGoal: 'endurance',
    },
    {
        title: 'Push Pull Power Session',
        difficulty: 'intermediate',
        targetMuscleGroups: ['chest', 'back', 'shoulders'],
        durationMinutes: 50,
        recommendedForGoal: 'strength',
    },
    {
        title: 'Mobility Reset Circuit',
        difficulty: 'beginner',
        targetMuscleGroups: ['hips', 'spine', 'hamstrings'],
        durationMinutes: 30,
        recommendedForGoal: 'mobility',
    },
];

async function seedDatabase() {
    console.log('Seed the octofit_db database with test data');
    console.log(`Connecting to ${mongoUrl}`);

    await connectToDatabase();

    await Promise.all([
        UserModel.deleteMany({}),
        TeamModel.deleteMany({}),
        ActivityModel.deleteMany({}),
        LeaderboardModel.deleteMany({}),
        WorkoutModel.deleteMany({}),
    ]);

    const [createdUsers, createdTeams, createdActivities, createdLeaderboard, createdWorkouts] =
        await Promise.all([
            UserModel.insertMany(users),
            TeamModel.insertMany(teams),
            ActivityModel.insertMany(activities),
            LeaderboardModel.insertMany(leaderboardEntries),
            WorkoutModel.insertMany(workouts),
        ]);

    console.log(`Inserted ${createdUsers.length} users`);
    console.log(`Inserted ${createdTeams.length} teams`);
    console.log(`Inserted ${createdActivities.length} activities`);
    console.log(`Inserted ${createdLeaderboard.length} leaderboard entries`);
    console.log(`Inserted ${createdWorkouts.length} workouts`);
}

seedDatabase()
    .catch((error) => {
        console.error('Failed to seed octofit_db', error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await disconnectFromDatabase();
    });