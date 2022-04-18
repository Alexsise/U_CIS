const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("рейд")
    .setDescription("Команда для создания сбора на рейд.")
    .addStringOption((option) =>
      option
        .setName("категория")
        .setDescription("Список рейдов для выбора")
        .setRequired(true)
        .addChoice("Хрустальный Чертог", "Хрустальный Чертог")
        .addChoice("Склеп Глубокого Камня", "Склеп Глубокого Камня")
        .addChoice("Последнее Желание", "Последнее Желание")
        .addChoice("Сад Спасения", "Сад Спасения")
        .addChoice("Клятва Послушника", "Клятва Послушника")
    )
    .addIntegerOption((option) =>
      option.setName("месяц").setDescription("Выбор месяц").setRequired(true)
    )
    .addIntegerOption((option) =>
      option.setName("день").setDescription("Выбор дня").setRequired(true)
    )
    .addIntegerOption((option) =>
      option.setName("час").setDescription("Выбор часа").setRequired(true)
    )
    .addIntegerOption((option) =>
      option.setName("минуты").setDescription("Выбор минуты").setRequired(true)
    ),

  async execute(interaction) {
    const x = {
      month: interaction.options.getInteger("месяц"),
      day: interaction.options.getInteger("день"),
      hour: interaction.options.getInteger("час"),
      minute: interaction.options.getInteger("минуты"),
    };

    

    const raid = interaction.options.getString("категория");
    
    // if (x.month < 1) await
    const dtAlarm = new Date();
    dtAlarm.setMonth(x.month - 1);
    dtAlarm.setDate(x.day);
    dtAlarm.setHours(x.hour, x.minute, 0);
    interaction.reply(`${dtAlarm.toLocaleString()} - ${raid}`);


  },
};
//MM.dd HH:mm

/*
{
    "content": "",
    "embed": {
        "title": "Hello ~~people~~ world :wave:",
        "description": "Игрок ${organisator} создает боевую группу\n```\nДля того, чтобы принять участие, нажмите на кнопку соответствующую свободному месту в списке\n```",
        "color": 4321431,
        "timestamp": "2022-04-18T12:02:17.232Z",
        "url": "https://discord.com",
        "author": {
            "name": "Author name",
            "url": "https://discord.com",
            "icon_url": "https://unsplash.it/100"
        },
        "thumbnail": {
            "url": "https://i.ytimg.com/vi/LCU47L30ByY/maxresdefault.jpg"
        },
        "image": {
            "url": ""
        },
        "footer": {
            "text": "",
            "icon_url": ""
        },
        "fields": [
            {
                "name": "Список участников:",
                "value": "Организатор: **${organisator}**\nИгроки:\n1) *${gamer1}*\n2) *${gamer2}*\n3) *${gamer3}*\n4) *${gamer4}*\n5) *${gamer5}*",
                "inline": false
            }
        ]
    }
}
*/
