export default function mrpaint() {
  console.log(`
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠿⠿⠿⠛⠛⠛⠛⠛⠛⠻⠿⠿⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠟⣛⣫⠭⣵⣖⣒⣾⣿⡯⠭⠽⠿⠿⠿⠿⠿⠿⠿⠿⠭⢿⣿⣷⣒⣶⣬⠭⣙⣛⠻⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢛⣩⣶⣾⡽⠶⣛⣫⡭⠭⠶⠶⠶⠾⣟⣛⣛⣛⣛⣛⣛⣛⣛⣛⣛⠶⠶⠶⠦⠭⢭⣛⣛⠾⢿⣷⣦⣍⡛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢁⣶⣿⢞⣋⣥⡬⠥⠖⣒⣒⣛⣭⣭⣭⣭⣭⣭⣽⣿⣶⣶⣶⣿⣿⣯⣭⣭⣭⣭⣽⣛⣒⣒⠶⠬⣤⣌⣙⡳⣿⣦⡙⢿⣿⣿⣿⣿⣿⣿⣿⣽⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⢾⡟⣾⢽⡟⢹⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣶⡍⠻⡯⣷⢹⡗⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⢸⣯⣟⣳⠯⣷⣻⣿⠿⢿⣿⣿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣤⣤⣤⣤⣤⣤⡭⠽⣿⣿⣿⠻⢿⣟⣺⠽⢞⣻⣽⣇⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣍⠙⢿⣿⣿⣿⣿⣿⣿⣿⡟⢸⣯⡿⣿⢿⣿⣷⣶⣾⣭⣭⣗⣒⣒⣚⣿⠿⠯⠭⠭⠭⠤⠤⠌⠉⠭⠭⠽⠿⢿⣓⣒⣒⣺⣭⣭⣵⣶⣾⣿⣿⣿⣿⣹⡇⢻⣿⣿⣿⣿⣿⣿⣿⣿⣯⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡈⣿⣿⣿⡾⣿⣿⣿⣿⣟⣛⡛⠛⠛⠻⢿⣿⣿⣿⣿⣿⣿⣿⣷⣄⣿⣿⣿⣿⡿⠟⠛⠛⠛⣛⣻⣿⣿⣿⣿⣧⣿⣿⣿⢁⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⡿⢟⣉⡭⣭⡙⢿⣿⣿⣿⣧⠹⣿⢿⣇⣿⣿⣿⣿⣿⣿⣿⣿⣷⡶⣤⣌⡙⠙⠋⠛⠛⠛⠛⠋⠉⠋⠉⣁⣤⡶⣾⣿⣿⣿⣿⣿⣿⣿⣿⢸⡿⣿⠇⣼⣿⣿⣿⡿⢋⣭⢭⣉⡻⢿⣿⣿⣿
⣿⡏⣴⢏⠁⠀⠀⠙⣦⡙⢿⣿⡿⠓⣘⠷⣿⢸⣿⣿⡟⠿⡹⣿⣿⠃⠀⠀⠉⠻⣦⣄⠀⠱⣤⡎⠀⣀⣴⠟⠋⠀⠀⠈⣿⣿⢟⡿⢻⣿⣿⡇⣿⠾⣃⠺⢿⣿⡿⢋⡴⠋⠀⠀⠈⠙⣆⢹⣿⣿
⣿⣧⠹⣿⣷⣦⣴⡋⠻⣿⢦⣅⣴⠋⠉⠉⡻⢧⣿⣿⣿⡀⠀⠘⣿⣦⡀⠀⠀⢀⣼⣿⣿⣾⣿⣷⣾⣿⣧⡀⠀⠀⢀⣰⣿⡋⠀⢀⣾⣿⣿⡴⠛⠉⠉⠙⣦⣩⡴⣾⠟⢙⣦⣴⣾⣳⠏⣼⣿⣿
⢟⣩⣥⣽⣾⣿⣽⣿⣶⣌⣆⣸⡷⠒⢲⣄⣿⣷⡝⣿⣿⣧⢰⣆⠈⠉⠩⠽⠿⠟⠿⡿⠟⠁⠀⠈⠛⢿⡿⠻⠿⡿⠍⠉⠁⢠⡆⣼⣿⣿⢫⣾⣧⣠⡖⠒⢾⣆⣰⣣⣴⣿⣯⣿⣿⣯⣬⣍⠻⣿
⣾⠁⠀⠀⠈⠉⠛⠻⣿⣿⣯⡟⢀⣴⣿⢿⣿⣟⣱⢿⣿⣿⣧⣿⡄⢰⡄⠀⠀⣠⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠀⠀⢀⣴⢀⣿⣷⣿⣿⣿⣎⢿⣟⡿⣷⣦⡀⢻⣿⣿⡿⠟⠛⠉⠁⠀⠀⠈⣷⢘
⠹⣞⣿⣿⣶⣦⣴⣍⡙⠻⣿⣶⣿⣿⣿⡿⠛⠁⣾⡘⣿⣿⣿⣿⣷⣸⣿⡀⢀⣿⡆⠀⢸⡄⠀⢠⡇⠀⢠⣿⡄⠀⣾⣿⣾⣿⢿⣿⣿⣇⣿⠈⠻⢿⣿⣿⣿⣾⣿⠟⠋⣩⣦⣴⣶⣾⡿⣳⠏⣼
⠗⣈⣿⣿⣾⣿⣽⣿⣿⣶⣬⣿⣿⣋⠁⠀⣀⢠⡿⣇⢿⣿⣿⡹⣿⣿⣿⣧⢸⣿⣿⡀⢸⣷⣀⣾⡇⢀⣾⣿⣧⣼⣿⣿⣿⠏⣿⣿⣿⢸⣿⡠⡀⠀⢈⣹⣿⣿⣵⣾⣿⣿⣭⣿⣾⣿⣿⣁⠺⣿
⣼⢃⡀⠀⠀⠈⢩⠭⢿⣿⣿⣿⣿⣿⣿⣿⣵⠟⢀⣿⡸⣿⣿⣇⠹⣿⡿⣿⣿⣿⣿⣷⣼⣿⣿⣿⣇⣾⣿⣿⣿⣿⣿⣿⡟⢸⣿⣿⡇⣿⡉⠻⣮⣿⣻⣿⣿⣿⣿⣿⡿⢭⡉⠁⠀⠀⢀⢸⡇⢹
⡘⢯⣻⣿⣻⣿⣾⣷⣶⣤⣭⣿⣿⣿⣿⠋⡿⠞⣩⣽⡇⣿⣿⣿⡄⠹⡇⠹⣿⣿⡟⣿⣿⣿⠛⣿⣿⣿⠏⣿⣿⡟⢸⠟⠀⣾⣿⣿⢰⣿⣝⠳⣿⢹⣿⣿⣿⣿⣭⣴⣶⣾⣿⣿⣿⣿⣿⡿⢃⣾
⣿⣶⣭⣍⡹⢿⣛⡿⢿⣿⣿⠿⢟⣫⣿⣾⣷⣿⡿⠟⣿⢸⣿⣿⣷⢀⣁⠀⠹⣿⡇⠹⣿⡟⠀⢻⣿⡟⠀⣿⠏⠀⣨⡄⣼⣿⣿⡏⣼⠻⣿⣷⣾⣿⣿⣟⡿⢿⣿⣿⡿⢿⣛⡽⢋⣩⣥⣶⣿⣿
⣿⣿⣿⣿⣿⣶⣬⡙⠿⣿⣿⡿⠿⣿⣿⡿⠟⣋⣴⠇⣻⡆⣿⣿⣿⣿⣿⡆⠀⠘⠇⠀⠻⡇⠀⠘⡟⠀⠸⠋⠀⢠⣿⣷⣿⣿⣿⢡⣟⠰⣦⣙⠻⣿⣿⣿⠿⢿⣿⣿⠟⡉⢡⣾⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⠻⣿⣿⣷⡆⢩⡍⢩⣭⣤⣶⠟⣫⡴⢚⣽⣧⣽⣿⣿⣿⣿⣷⢰⣦⣼⣶⣄⠀⠀⠀⣠⣶⣧⣴⡆⣼⣿⣿⣿⣿⣯⣼⣏⡳⢦⣙⠿⣶⣬⣭⣭⣭⠁⣶⠀⡇⢸⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⢸⣷⣾⠟⣋⡴⠚⠁⣠⣴⣿⣿⡶⣭⣟⡻⠿⣿⠈⣿⣿⣿⣿⣷⣶⣾⣿⣿⣿⣿⠇⡿⠿⢟⣻⣭⣶⣿⣿⣯⡀⠈⠳⢬⡙⢿⣿⣿⠀⣿⣶⣷⣼⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⢸⣿⣿⡐⢯⣀⡀⣾⣿⣿⠋⣥⣶⣦⣍⣙⡛⠿⠃⠿⢯⣭⣭⣭⣭⣭⣭⣭⡭⠿⠰⠿⢛⣛⣩⣴⣶⣌⢛⣿⣿⣦⣀⣀⡿⢨⣿⣿⠀⣿⣿⣿⢻⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⣸⣿⣿⣷⣌⠻⣝⢿⣿⣿⡷⣌⠻⣿⣿⣿⣿⣿⡆⢰⠀⣶⠀⣶⣶⣶⣶⣶⠂⣶⣾⣿⣿⣿⣿⡿⢋⣵⣿⣿⣿⢟⣵⢋⣴⣿⣿⣿⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡌⢳⣝⢿⣿⣮⣿⣦⡙⢿⣿⣿⣷⣾⠀⣿⣤⣿⣿⣿⣿⣿⠶⣿⣿⣿⣿⠿⣋⣴⣯⣿⣿⡟⣡⠟⣡⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⣋⣭⠥⠶⠒⠛⠓⠻⣿⣿⣿⣿⣦⡙⣿⣿⣿⠀⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢁⣾⣿⣿⣿⣿⠛⠚⠓⠒⠶⠬⣭⣙⠻⢿⣯⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⣡⡶⠋⠁⠀⠀⠀⢀⣀⣴⣾⣿⣿⠿⣟⣻⡷⢸⣿⣿⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⡁⢾⣟⣻⡿⣿⣿⣷⣦⣀⡀⠀⠀⠀⠉⠛⢦⡙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⠏⣴⠋⠀⣀⣤⣴⣶⣿⣿⢿⣟⣿⠿⠿⣛⣫⣥⣶⣿⣿⣿⡀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣬⣝⣛⠿⠿⣿⣻⡿⣿⣿⣶⣤⣄⡀⠀⢻⡆⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⡿⢰⣯⣴⣿⣟⣿⣭⣽⡶⠿⣛⣭⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣭⣛⠻⠶⣿⣭⣿⣻⣷⣦⣿⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣧⣬⣭⣭⣭⣭⣥⣶⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣶⣬⣭⣭⣭⣭⣥⣿⣿⣿⣿⣿⣿⣿⣿⣿
    `);
}